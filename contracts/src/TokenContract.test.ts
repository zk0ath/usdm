import { TokenContract } from './TokenContract';
import { Mina, PrivateKey, PublicKey, UInt64, AccountUpdate } from 'o1js';

class TokenContractTestHelper {
  public static local: ReturnType<typeof Mina.LocalBlockchain>;
  public static zkApp: TokenContract;
  public static zkAppAddress: PublicKey;
  public static zkAppPrivateKey: PrivateKey;
  public static feePayerPublicKey: PublicKey;
  public static feePayerPrivateKey: PrivateKey;

  static async initBlockchain(proofsEnabled: boolean) {
    TokenContractTestHelper.local = Mina.LocalBlockchain({
      proofsEnabled,
      enforceTransactionLimits: false
    });
    Mina.setActiveInstance(TokenContractTestHelper.local);
    const { privateKey, publicKey } = TokenContractTestHelper.local.testAccounts[0];
    TokenContractTestHelper.feePayerPrivateKey = privateKey;
    TokenContractTestHelper.feePayerPublicKey = publicKey;
    TokenContractTestHelper.zkAppPrivateKey = PrivateKey.random();
    TokenContractTestHelper.zkAppAddress = TokenContractTestHelper.zkAppPrivateKey.toPublicKey();
    TokenContractTestHelper.zkApp = new TokenContract(TokenContractTestHelper.zkAppAddress);
  }

  static async localDeploy(feePayerKey: PrivateKey) {
    await TokenContractTestHelper.executeTransaction(() => {
      AccountUpdate.fundNewAccount(feePayerKey.toPublicKey());
      TokenContractTestHelper.zkApp.deploy();
    }, [feePayerKey, TokenContractTestHelper.zkAppPrivateKey]);
  }

  static async executeTransaction(
    action: (deployerAccount: PublicKey) => void,
    signers: PrivateKey[]
  ) {
    const txn = await Mina.transaction(TokenContractTestHelper.feePayerPublicKey, () => {
      action(TokenContractTestHelper.feePayerPublicKey);
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
    await TokenContractTestHelper.initBlockchain(proofsEnabled);
  });

  it('should deploy the TokenContract with initial totalAmountInCirculation', async () => {
    await TokenContractTestHelper.localDeploy(TokenContractTestHelper.feePayerPrivateKey);
    const totalAmountInCirculation = TokenContractTestHelper.zkApp.totalAmountInCirculation.get();
    expect(totalAmountInCirculation).toEqual(UInt64.from(0n));
  });

  it('should mint tokens and update totalAmountInCirculation correctly', async () => {
    await TokenContractTestHelper.localDeploy(TokenContractTestHelper.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
  
    await TokenContractTestHelper.executeTransaction(() => {
      AccountUpdate.fundNewAccount(TokenContractTestHelper.feePayerPublicKey);
      TokenContractTestHelper.zkApp.mint(TokenContractTestHelper.local.testAccounts[2].publicKey, amountToMint);
    }, [TokenContractTestHelper.feePayerPrivateKey, TokenContractTestHelper.zkAppPrivateKey]);
  
    const totalAmountAfterMint = TokenContractTestHelper.zkApp.totalAmountInCirculation.get();
    expect(totalAmountAfterMint).toEqual(amountToMint);
  
    const receiverBalance = Mina.getBalance(TokenContractTestHelper.local.testAccounts[2].publicKey, TokenContractTestHelper.zkApp.token.id).value.toBigInt();
    expect(receiverBalance).toEqual(amountToMint.toBigInt());
  });
  
  it('should burn tokens and update totalAmountInCirculation correctly', async () => {
    await TokenContractTestHelper.localDeploy(TokenContractTestHelper.feePayerPrivateKey);
    const amountToMint = UInt64.from(100n);
    const amountToBurn = UInt64.from(50n);
  
    // Mint some tokens before burning them
    await TokenContractTestHelper.executeTransaction(() => {
      AccountUpdate.fundNewAccount(TokenContractTestHelper.feePayerPublicKey);
      TokenContractTestHelper.zkApp.mint(TokenContractTestHelper.local.testAccounts[1].publicKey, amountToMint);
    }, [TokenContractTestHelper.feePayerPrivateKey, TokenContractTestHelper.zkAppPrivateKey]);
  
    // Burn the tokens
    await TokenContractTestHelper.executeTransaction(() => {
      TokenContractTestHelper.zkApp.burn(TokenContractTestHelper.local.testAccounts[1].publicKey, amountToBurn);
    }, [TokenContractTestHelper.feePayerPrivateKey, TokenContractTestHelper.local.testAccounts[1].privateKey, TokenContractTestHelper.zkAppPrivateKey]);
  
    const totalAmountAfterBurn = TokenContractTestHelper.zkApp.totalAmountInCirculation.get();
    expect(totalAmountAfterBurn).toEqual(UInt64.from(50n));
  
    const senderBalance = Mina.getBalance(TokenContractTestHelper.local.testAccounts[1].publicKey, TokenContractTestHelper.zkApp.token.id).value.toBigInt();
    expect(senderBalance).toEqual(50n);
  });
  
  it('should transfer tokens and update balances correctly', async () => {
    await TokenContractTestHelper.localDeploy(TokenContractTestHelper.feePayerPrivateKey);
    const amountToTransfer = UInt64.from(30n);
    const senderInitialBalance = UInt64.from(100n);
  
    // Mint tokens to sender before transferring them
    await TokenContractTestHelper.executeTransaction(() => {
      AccountUpdate.fundNewAccount(TokenContractTestHelper.feePayerPublicKey);
      TokenContractTestHelper.zkApp.mint(TokenContractTestHelper.local.testAccounts[1].publicKey, senderInitialBalance);
    }, [TokenContractTestHelper.feePayerPrivateKey, TokenContractTestHelper.local.testAccounts[1].privateKey, TokenContractTestHelper.zkAppPrivateKey]);
  
    // Transfer the tokens
    await TokenContractTestHelper.executeTransaction(() => {
      AccountUpdate.fundNewAccount(TokenContractTestHelper.feePayerPublicKey);
      TokenContractTestHelper.zkApp.transfer(TokenContractTestHelper.local.testAccounts[1].publicKey, TokenContractTestHelper.local.testAccounts[2].publicKey, amountToTransfer);
    }, [TokenContractTestHelper.feePayerPrivateKey, TokenContractTestHelper.local.testAccounts[1].privateKey, TokenContractTestHelper.local.testAccounts[2].privateKey, TokenContractTestHelper.zkAppPrivateKey]);
  
    const senderFinalBalance = TokenContractTestHelper.zkApp.getBalance(TokenContractTestHelper.local.testAccounts[1].publicKey);
    const receiverFinalBalance = TokenContractTestHelper.zkApp.getBalance(TokenContractTestHelper.local.testAccounts[2].publicKey);
    expect(senderFinalBalance).toEqual(senderInitialBalance.sub(amountToTransfer));
    expect(receiverFinalBalance).toEqual(amountToTransfer);
  });

});