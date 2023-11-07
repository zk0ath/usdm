import { TokenContract } from './TokenContract';
import { UInt64, Mina, PrivateKey, PublicKey, AccountUpdate, Signature } from 'o1js';

let proofsEnabled = false;

describe('TokenContract', () => {
  let Local: ReturnType<typeof Mina.LocalBlockchain>;;
  let deployerAccount: PublicKey,
      deployerKey: PrivateKey,
      senderAccount: PublicKey,
      senderKey: PrivateKey,
      receiverAccount: PublicKey,
      receiverKey: PrivateKey,
      zkAppAddress: PublicKey,
      zkAppPrivateKey: PrivateKey,
      zkApp: TokenContract;

  const initBlockchain = async () => {
    Local = Mina.LocalBlockchain({ proofsEnabled, enforceTransactionLimits: false });
    Mina.setActiveInstance(Local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
    ({ privateKey: receiverKey, publicKey: receiverAccount } = Local.testAccounts[2]);
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new TokenContract(zkAppAddress);
  };

  const localDeploy = async () => {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
    });
    await txn.prove();
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  };

  const performTransaction = async (
    action: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) => {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      action(deployerAccount);
    });
    await txn.prove();
    await txn.sign(signers).send();
  };

  const performTransaction3 = async (
    action: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) => {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      action(deployerAccount);
      AccountUpdate.attachToTransaction(zkApp.self);
      zkApp.requireSignature();
    });
    await txn.prove();
    await txn.sign(signers).send();
  };

  const performTransaction2 = async (
    action: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) => {
    const txn = await Mina.transaction(deployerAccount, () => {
      action(deployerAccount);
    });
    await txn.prove();
    await txn.sign(signers).send();
  };

  beforeAll(async () => {
    if (proofsEnabled) await TokenContract.compile();
  });

  beforeEach(() => {
    initBlockchain();
  });

  it('should deploy the TokenContract with initial totalAmountInCirculation', async () => {
    await localDeploy();
    const totalAmountInCirculation = zkApp.totalAmountInCirculation.get();
    expect(totalAmountInCirculation).toEqual(UInt64.from(0n));
  });

  it('should mint tokens and update totalAmountInCirculation correctly', async () => {
    await localDeploy();
  const amountToMint = UInt64.from(100n);

  await performTransaction(() => {
    zkApp.mint(receiverAccount, amountToMint);
    zkApp.requireSignature();
  }, [deployerKey, zkAppPrivateKey]);

  const totalAmountAfterMint = zkApp.totalAmountInCirculation.get();
  expect(totalAmountAfterMint).toEqual(amountToMint);

  expect(
    Mina.getBalance(receiverAccount, zkApp.token.id).value.toBigInt()
  ).toEqual(amountToMint.toBigInt());
  });

  it('should burn tokens and update totalAmountInCirculation correctly', async () => {
    await localDeploy();
    const amountToMint = UInt64.from(100n);
  
    await performTransaction(() => {
      zkApp.mint(senderAccount, amountToMint);
      zkApp.requireSignature();
    }, [deployerKey, zkAppPrivateKey]);
  
    const amountToBurn = UInt64.from(50n);
    await performTransaction2(() => {
      zkApp.burn(senderAccount, amountToBurn);
      zkApp.requireSignature();
    }, [deployerKey, senderKey, zkAppPrivateKey]);
  
    const totalAmountAfterBurn = zkApp.totalAmountInCirculation.get();
    expect(totalAmountAfterBurn).toEqual(UInt64.from(50n));

    expect(
      Mina.getBalance(senderAccount, zkApp.token.id).value.toBigInt()
    ).toEqual(50n);
  });

  it('should transfer tokens and update balances correctly', async () => {
    await localDeploy();
    const amountToTransfer = UInt64.from(30n);
    const senderInitialBalance = UInt64.from(100n);

    await performTransaction(() => zkApp.mint(senderAccount, senderInitialBalance), [senderKey, deployerKey]);

    await performTransaction3(() => zkApp.transfer(senderAccount, receiverAccount, amountToTransfer), [senderKey, receiverKey, deployerKey, zkAppPrivateKey]);

    const senderFinalBalance = zkApp.getBalance(senderAccount);
    const receiverFinalBalance = zkApp.getBalance(receiverAccount);
    expect(senderFinalBalance).toEqual(senderInitialBalance.sub(amountToTransfer));
    expect(receiverFinalBalance).toEqual(amountToTransfer);
  });
});
