import { TokenContract } from './TokenContract';
import { Mina, PrivateKey, PublicKey, UInt64, AccountUpdate, Signature, Field } from 'o1js';

class tch {
  public static local: ReturnType<typeof Mina.LocalBlockchain>;
  public static zkApp: TokenContract;
  public static zkAppAddress: PublicKey;
  public static zkAppPrivateKey: PrivateKey;
  public static feePayerPublicKey: PublicKey;
  public static feePayerPrivateKey: PrivateKey;

  static async initBlockchain(proofsEnabled: boolean) {
    tch.local = Mina.LocalBlockchain({
      proofsEnabled,
      enforceTransactionLimits: false
    });
    Mina.setActiveInstance(tch.local);
    const { privateKey, publicKey } = tch.local.testAccounts[0];
    tch.feePayerPrivateKey = privateKey;
    tch.feePayerPublicKey = publicKey;
    tch.zkAppPrivateKey = PrivateKey.random();
    tch.zkAppAddress = tch.zkAppPrivateKey.toPublicKey();
    tch.zkApp = new TokenContract(tch.zkAppAddress);
  }

  static async localDeploy(feePayerKey: PrivateKey) {
    await tch.executeTransaction(() => {
      AccountUpdate.fundNewAccount(feePayerKey.toPublicKey());
      tch.zkApp.deploy();
    }, [feePayerKey, tch.zkAppPrivateKey]);
  }

  static async executeTransaction(
    action: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) {
    const txn = await Mina.transaction(tch.feePayerPublicKey, () => {
      action(tch.feePayerPublicKey);
    });
    await txn.prove();
    await txn.sign(signers).send();
  }

  static async executeTransactionWithSignature(
    action: (deployerAccount: PublicKey, adminSignature: Signature) => void,
    signers: PrivateKey[],
    adminKey: PrivateKey,
    extraFields: Field[]
  ) {
    const adminSignature = Signature.create(adminKey, extraFields);
    const txn = await Mina.transaction(tch.feePayerPublicKey, () => {
      action(tch.feePayerPublicKey, adminSignature);
    });
    await txn.prove();
    await txn.sign(signers).send();
  }
}

describe('TokenContract', () => {
  let proofsEnabled = false;

  beforeAll(async () => {
    if (proofsEnabled) await TokenContract.compile();
  });

  beforeEach(async () => {
    await tch.initBlockchain(proofsEnabled);
  });

  it('should deploy the TokenContract with initial totalAmountInCirculation', async () => {
    await tch.localDeploy(tch.feePayerPrivateKey);
    const totalAmountInCirculation = tch.zkApp.totalAmountInCirculation.get();
    expect(totalAmountInCirculation).toEqual(UInt64.from(0n));
  });

  it('should mint tokens and update totalAmountInCirculation correctly', async () => {
    await tch.localDeploy(tch.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
    const mintToAddress = tch.local.testAccounts[2].publicKey;
    const mintSignature = Signature.create(tch.zkAppPrivateKey, [
      ...amountToMint.toFields(),
      ...mintToAddress.toFields(),
      ...tch.zkApp.mintNonce.get().toFields(),
    ]);
    expect(tch.zkApp.totalAmountInCirculation.get()).toEqual(UInt64.from(0));

    await tch.executeTransaction(() => {
      AccountUpdate.fundNewAccount(tch.feePayerPublicKey);
      tch.zkApp.mint(mintToAddress, amountToMint, mintSignature);
    }, [tch.feePayerPrivateKey, tch.zkAppPrivateKey]);
  
    const totalAmountAfterMint = tch.zkApp.totalAmountInCirculation.get();
    expect(totalAmountAfterMint).toEqual(amountToMint);
  
    const receiverBalance = Mina.getBalance(tch.local.testAccounts[2].publicKey, tch.zkApp.token.id).value.toBigInt();
    expect(receiverBalance).toEqual(amountToMint.toBigInt());
  });
  
  it('should burn tokens and update totalAmountInCirculation correctly', async () => {
    await tch.localDeploy(tch.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
    const amountToBurn = UInt64.from(50n);
    const mintToAddress = tch.local.testAccounts[1].publicKey;
    const mintSignature = Signature.create(tch.zkAppPrivateKey, [
      ...amountToMint.toFields(),
      ...mintToAddress.toFields(),
      ...tch.zkApp.mintNonce.get().toFields(),
    ]);
    // Mint some tokens before burning them
    await tch.executeTransaction(() => {
      AccountUpdate.fundNewAccount(tch.feePayerPublicKey);
      tch.zkApp.mint(mintToAddress, amountToMint, mintSignature);
    }, [tch.feePayerPrivateKey, tch.zkAppPrivateKey]);
  
    // Burn the tokens
    await tch.executeTransaction(() => {
      tch.zkApp.burn(tch.local.testAccounts[1].publicKey, amountToBurn);
    }, [tch.feePayerPrivateKey, tch.local.testAccounts[1].privateKey, tch.zkAppPrivateKey]);
  
    const totalAmountAfterBurn = tch.zkApp.totalAmountInCirculation.get();
    expect(totalAmountAfterBurn).toEqual(UInt64.from(50n));
  
    const senderBalance = Mina.getBalance(tch.local.testAccounts[1].publicKey, tch.zkApp.token.id).value.toBigInt();
    expect(senderBalance).toEqual(50n);
  });
  
  it('should transfer tokens and update balances correctly', async () => {
    await tch.localDeploy(tch.feePayerPrivateKey);
    const amountToTransfer = UInt64.from(30n);
    const senderInitialBalance = UInt64.from(100n);
    const mintToAddress = tch.local.testAccounts[1].publicKey;
    const mintSignature = Signature.create(tch.zkAppPrivateKey, [
      ...senderInitialBalance.toFields(),
      ...mintToAddress.toFields(),
      ...tch.zkApp.mintNonce.get().toFields(),
    ]);
    // Mint tokens to sender before transferring them
    await tch.executeTransaction(() => {
      AccountUpdate.fundNewAccount(tch.feePayerPublicKey);
      tch.zkApp.mint(mintToAddress, senderInitialBalance, mintSignature);
    }, [tch.feePayerPrivateKey, tch.local.testAccounts[1].privateKey, tch.zkAppPrivateKey]);
  
    // Transfer the tokens
    await tch.executeTransaction(() => {
      AccountUpdate.fundNewAccount(tch.feePayerPublicKey);
      tch.zkApp.transfer(tch.local.testAccounts[1].publicKey, tch.local.testAccounts[2].publicKey, amountToTransfer);
    }, [tch.feePayerPrivateKey, tch.local.testAccounts[1].privateKey, tch.local.testAccounts[2].privateKey, tch.zkAppPrivateKey]);
  
    const senderFinalBalance = tch.zkApp.getBalance(tch.local.testAccounts[1].publicKey);
    const receiverFinalBalance = tch.zkApp.getBalance(tch.local.testAccounts[2].publicKey);
    expect(senderFinalBalance).toEqual(senderInitialBalance.sub(amountToTransfer));
    expect(receiverFinalBalance).toEqual(amountToTransfer);
  });

});