import { TokenContract } from './TokenContract';
import {
  Mina,
  PrivateKey,
  PublicKey,
  UInt64,
  AccountUpdate,
  Signature,
  Field,
  Encoding,
} from 'o1js';

class BlockchainHandler {
  public SYMBOL = Encoding.stringToFields('USDM')[0];
  public DECIMALS = UInt64.from(9);
  public MAX_SUPPLY = UInt64.from(1000000000000000000n);

  public localBlockchain: ReturnType<typeof Mina.LocalBlockchain>;
  public tokenContract: TokenContract;
  public userPublicKey: PublicKey;
  public userPrivKey: PrivateKey;
  public contractAddress: PublicKey;
  public contractPrivateKey: PrivateKey;

  constructor(proofsEnabled: boolean) {
    this.localBlockchain = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(this.localBlockchain);

    const { privateKey, publicKey } = this.localBlockchain.testAccounts[0];
    this.userPrivKey = privateKey;
    this.userPublicKey = publicKey;

    this.contractPrivateKey = PrivateKey.random();
    this.contractAddress = this.contractPrivateKey.toPublicKey();
    this.tokenContract = new TokenContract(this.contractAddress);
  }

  public async initAsync() {
    await this.executeTransaction(() => {
      this.tokenContract.initialize(
        this.SYMBOL,
        this.DECIMALS,
        this.MAX_SUPPLY
      );
    }, [this.userPrivKey, this.contractPrivateKey]);
  }

  public async deployContract(userPrivKey: PrivateKey) {
    let userPublicKey = userPrivKey.toPublicKey();
    const tx = await Mina.transaction(userPublicKey, () => {
      AccountUpdate.fundNewAccount(userPublicKey);
      this.tokenContract.deploy();
    });
    await tx.prove();
    tx.sign([userPrivKey, this.contractPrivateKey]);
    await tx.send();
    this.tokenContract.symbol.getAndRequireEquals().assertEquals(Field(0));
    this.tokenContract.decimals.getAndRequireEquals().assertEquals(UInt64.zero);
    this.tokenContract.maxSupply
      .getAndRequireEquals()
      .assertEquals(UInt64.zero);
    this.tokenContract.totalAmountInCirculation
      .getAndRequireEquals()
      .assertEquals(UInt64.zero);
  }

  public async executeTransaction(
    transactionLogic: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) {
    const transaction = await Mina.transaction(this.userPublicKey, () => {
      transactionLogic(this.userPublicKey);
    });
    await transaction.prove();
    await transaction.sign(signers).send();
  }
}

describe('TokenContract', () => {
  let proofsEnabled = true;
  let blockchainHandler: BlockchainHandler;

  beforeAll(async () => {
    if (proofsEnabled) await TokenContract.compile();
    blockchainHandler = new BlockchainHandler(proofsEnabled);
  });

  it('should deploy the TokenContract with initial totalAmountInCirculation', async () => {
    await blockchainHandler.deployContract(blockchainHandler.userPrivKey);
  });

  it('should mint tokens and update totalAmountInCirculation correctly', async () => {
    await blockchainHandler.initAsync();
    const amountToMint = UInt64.from(100n);
    const mintToAddress = blockchainHandler.localBlockchain.testAccounts[2].publicKey;

    await blockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(blockchainHandler.userPublicKey);
      blockchainHandler.tokenContract.mint(mintToAddress, amountToMint);
    }, [blockchainHandler.userPrivKey, blockchainHandler.contractPrivateKey]);

    const totalAmountAfterMint =
      blockchainHandler.tokenContract.totalAmountInCirculation.get();
    expect(totalAmountAfterMint).toEqual(amountToMint);

    const receiverBalance = Mina.getBalance(
      mintToAddress,
      blockchainHandler.tokenContract.token.id
    ).value.toBigInt();
    expect(receiverBalance).toEqual(amountToMint.toBigInt());
  });

  it('should burn tokens and update totalAmountInCirculation correctly', async () => {
    await blockchainHandler.initAsync();
    const amountToMint = UInt64.from(100000n);
    const amountToBurn = UInt64.from(50000n);
    const mintToAddress = blockchainHandler.localBlockchain.testAccounts[0].publicKey;
    const burnToAddress = blockchainHandler.localBlockchain.testAccounts[0].publicKey;

    await blockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(blockchainHandler.userPublicKey);
      blockchainHandler.tokenContract.mint(mintToAddress, amountToMint);
    }, [blockchainHandler.userPrivKey, blockchainHandler.contractPrivateKey]);

    await blockchainHandler.executeTransaction(() => {
      // AccountUpdate.fundNewAccount(blockchainHandler.userPublicKey);
      blockchainHandler.tokenContract.burn(burnToAddress, amountToBurn);
    }, [blockchainHandler.userPrivKey, blockchainHandler.contractPrivateKey]);

    const totalAmountAfterBurn = blockchainHandler.tokenContract.totalAmountInCirculation.get();
    expect(totalAmountAfterBurn).toEqual(UInt64.from(50n));
  });

  // it('should transfer tokens and update balances correctly', async () => {
  //   await blockchainHandler.initAsync();
  //   const amountToTransfer = UInt64.from(30n);
  //   const senderInitialBalance = UInt64.from(100n);
  //   const senderAddress = blockchainHandler.localBlockchain.testAccounts[1].publicKey;
  //   const receiverAddress = blockchainHandler.localBlockchain.testAccounts[2].publicKey;
  //   const mintSignature = Signature.create(blockchainHandler.contractPrivateKey, [
  //     ...senderInitialBalance.toFields(),
  //     ...senderAddress.toFields(),
  //   ]);

  //   await blockchainHandler.executeTransaction(() => {
  //     AccountUpdate.fundNewAccount(blockchainHandler.userPublicKey);
  //     blockchainHandler.tokenContract.mint(senderAddress, senderInitialBalance);
  //   }, [blockchainHandler.userPrivKey, blockchainHandler.contractPrivateKey]);

  //   await blockchainHandler.executeTransaction(() => {
  //     AccountUpdate.fundNewAccount(blockchainHandler.userPublicKey);
  //     blockchainHandler.tokenContract.transfer(senderAddress, receiverAddress, amountToTransfer);
  //   }, [blockchainHandler.userPrivKey, blockchainHandler.contractPrivateKey]);

  //   const senderFinalBalance = Mina.getBalance(senderAddress, blockchainHandler.tokenContract.token.id).value.toBigInt();
  //   const receiverFinalBalance = Mina.getBalance(receiverAddress, blockchainHandler.tokenContract.token.id).value.toBigInt();
  //   expect(senderFinalBalance).toEqual(senderInitialBalance.toBigInt() - amountToTransfer.toBigInt());
  //   expect(receiverFinalBalance).toEqual(amountToTransfer.toBigInt());
  // });
});
