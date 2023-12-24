import { TokenContract } from './TokenContract';
import { Mina, PrivateKey, PublicKey, UInt64, AccountUpdate, Signature, Field } from 'o1js';

class BlockchainHandler {
  public static localBlockchain: ReturnType<typeof Mina.LocalBlockchain>;
  public static tokenContract: TokenContract;
  public static contractAddress: PublicKey;
  public static contractPrivateKey: PrivateKey;
  public static feePayerPublicKey: PublicKey;
  public static feePayerPrivateKey: PrivateKey;

  static async initialize(proofsEnabled: boolean) {
    this.localBlockchain = Mina.LocalBlockchain({
      proofsEnabled,
      enforceTransactionLimits: false,
    });
    Mina.setActiveInstance(this.localBlockchain);
    const { privateKey, publicKey } = this.localBlockchain.testAccounts[0];
    this.feePayerPrivateKey = privateKey;
    this.feePayerPublicKey = publicKey;
    this.contractPrivateKey = PrivateKey.random();
    this.contractAddress = this.contractPrivateKey.toPublicKey();
    this.tokenContract = new TokenContract(this.contractAddress);
  }

  static async deployContract(feePayerKey: PrivateKey) {
    await this.executeTransaction(() => {
      AccountUpdate.fundNewAccount(feePayerKey.toPublicKey());
      this.tokenContract.deploy();
    }, [feePayerKey, this.contractPrivateKey]);
  }

  static async executeTransaction(
    transactionLogic: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[],
  ) {
    const transaction = await Mina.transaction(this.feePayerPublicKey, () => {
      transactionLogic(this.feePayerPublicKey);
    });
    await transaction.prove();
    await transaction.sign(signers).send();
  }

  static async executeTransactionWithSignature(
    transactionLogic: (deployerAccount: PublicKey, adminSignature: Signature) => void,
    signers: PrivateKey[],
    adminKey: PrivateKey,
    extraFields: Field[]
  ) {
    const adminSignature = Signature.create(adminKey, extraFields);
    const transaction = await Mina.transaction(this.feePayerPublicKey, () => {
      transactionLogic(this.feePayerPublicKey, adminSignature);
    });
    await transaction.prove();
    await transaction.sign(signers).send();
  }
}

describe('TokenContract', () => {
  let proofsEnabled = false;

  beforeAll(async () => {
    if (proofsEnabled) await TokenContract.compile();
  });

  beforeEach(async () => {
    await BlockchainHandler.initialize(proofsEnabled);
  });

  it('should deploy the TokenContract with initial totalAmountInCirculation', async () => {
    await BlockchainHandler.deployContract(BlockchainHandler.feePayerPrivateKey);
    const totalAmountInCirculation = BlockchainHandler.tokenContract.totalAmountInCirculation.get();
    expect(totalAmountInCirculation).toEqual(UInt64.from(0n));
  });

  it('should mint tokens and update totalAmountInCirculation correctly', async () => {
    await BlockchainHandler.deployContract(BlockchainHandler.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
    const mintToAddress = BlockchainHandler.localBlockchain.testAccounts[2].publicKey;
    const mintSignature = Signature.create(BlockchainHandler.contractPrivateKey, [
      ...amountToMint.toFields(),
      ...mintToAddress.toFields(),
    ]);

    await BlockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(BlockchainHandler.feePayerPublicKey);
      BlockchainHandler.tokenContract.mint(mintToAddress, amountToMint, mintSignature);
    }, [BlockchainHandler.feePayerPrivateKey, BlockchainHandler.contractPrivateKey]);

    const totalAmountAfterMint = BlockchainHandler.tokenContract.totalAmountInCirculation.get();
    expect(totalAmountAfterMint).toEqual(amountToMint);

    const receiverBalance = Mina.getBalance(mintToAddress, BlockchainHandler.tokenContract.token.id).value.toBigInt();
    expect(receiverBalance).toEqual(amountToMint.toBigInt());
  });

  it('should burn tokens and update totalAmountInCirculation correctly', async () => {
    await BlockchainHandler.deployContract(BlockchainHandler.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
    const amountToBurn = UInt64.from(50n);
    const mintToAddress = BlockchainHandler.localBlockchain.testAccounts[1].publicKey;
    const mintSignature = Signature.create(BlockchainHandler.contractPrivateKey, [
      ...amountToMint.toFields(),
      ...mintToAddress.toFields(),
    ]);

    await BlockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(BlockchainHandler.feePayerPublicKey);
      BlockchainHandler.tokenContract.mint(mintToAddress, amountToMint, mintSignature);
    }, [BlockchainHandler.feePayerPrivateKey, BlockchainHandler.contractPrivateKey]);

    const burnSignature = Signature.create(BlockchainHandler.contractPrivateKey, [
      ...amountToBurn.toFields(),
      ...mintToAddress.toFields(),
    ]);

    await BlockchainHandler.executeTransaction(() => {
      BlockchainHandler.tokenContract.burn(mintToAddress, amountToBurn, burnSignature);
    }, [BlockchainHandler.feePayerPrivateKey, BlockchainHandler.contractPrivateKey]);

    const totalAmountAfterBurn = BlockchainHandler.tokenContract.totalAmountInCirculation.get();
    expect(totalAmountAfterBurn).toEqual(UInt64.from(50n));
  });

  it('should transfer tokens and update balances correctly', async () => {
    await BlockchainHandler.deployContract(BlockchainHandler.feePayerPrivateKey);
    const amountToTransfer = UInt64.from(30n);
    const senderInitialBalance = UInt64.from(100n);
    const senderAddress = BlockchainHandler.localBlockchain.testAccounts[1].publicKey;
    const receiverAddress = BlockchainHandler.localBlockchain.testAccounts[2].publicKey;
    const mintSignature = Signature.create(BlockchainHandler.contractPrivateKey, [
      ...senderInitialBalance.toFields(),
      ...senderAddress.toFields(),
    ]);

    await BlockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(BlockchainHandler.feePayerPublicKey);
      BlockchainHandler.tokenContract.mint(senderAddress, senderInitialBalance, mintSignature);
    }, [BlockchainHandler.feePayerPrivateKey, BlockchainHandler.contractPrivateKey]);

    await BlockchainHandler.executeTransaction(() => {
      AccountUpdate.fundNewAccount(BlockchainHandler.feePayerPublicKey);
      BlockchainHandler.tokenContract.transfer(senderAddress, receiverAddress, amountToTransfer);
    }, [BlockchainHandler.feePayerPrivateKey, BlockchainHandler.contractPrivateKey]);

    const senderFinalBalance = Mina.getBalance(senderAddress, BlockchainHandler.tokenContract.token.id).value.toBigInt();
    const receiverFinalBalance = Mina.getBalance(receiverAddress, BlockchainHandler.tokenContract.token.id).value.toBigInt();
    expect(senderFinalBalance).toEqual(senderInitialBalance.toBigInt() - amountToTransfer.toBigInt());
    expect(receiverFinalBalance).toEqual(amountToTransfer.toBigInt());
  });
});
