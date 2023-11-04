import { TokenContract } from './TokenContract';
import { UInt64, Mina, PrivateKey, PublicKey, Signature, AccountUpdate } from 'o1js';

describe('TokenContract', () => {
  let deployerAccount: PublicKey,
      adminAccount: PublicKey,
      userAccount: PublicKey,
      zkApp: TokenContract;

  beforeAll(async () => {
    await TokenContract.compile();
  });

  beforeEach(() => {
    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);

    deployerAccount = Local.testAccounts[0].publicKey;
    adminAccount = Local.testAccounts[1].publicKey;
    userAccount = Local.testAccounts[2].publicKey;

    zkApp = new TokenContract(deployerAccount);
  });

  async function deployAndInitialize() {
    (await (await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
      zkApp.init();
    })).send()).wait();
  }

  it('deploys the TokenContract and initializes totalSupply', async () => {
    await deployAndInitialize();
    const totalSupply = zkApp.totalSupply.get();
    expect(totalSupply).toEqual(UInt64.zero);
  });

  it('mints tokens and increases totalSupply', async () => {
    await deployAndInitialize();

    const amountToMint = UInt64.from(1000);
    const adminSignature = new Signature(); // Signature needs to be obtained based on the logic of minting

    (await (await Mina.transaction(adminAccount, () => {
      zkApp.mint(userAccount, amountToMint, adminSignature);
    })).send()).wait();

    const newTotalSupply = zkApp.totalSupply.get();
    expect(newTotalSupply).toEqual(amountToMint);
  });

  it('burns tokens and decreases totalSupply', async () => {
    await deployAndInitialize();
    // Assume tokens have been minted to the userAccount here before burning...

    const amountToBurn = UInt64.from(500);
    const adminSignature = new Signature(); // Signature needs to be obtained based on the logic of burning

    (await (await Mina.transaction(adminAccount, () => {
      zkApp.burn(userAccount, amountToBurn, adminSignature);
    })).send()).wait();

    const newTotalSupply = zkApp.totalSupply.get();
    // Assuming that the totalSupply was initially greater than amountToBurn
    expect(newTotalSupply.toBigInt()).toBeLessThan(UInt64.of(1000).toBigInt()); // assuming the initial totalSupply was 1000
  });

  it('transfers tokens and updates balances correctly', async () => {
    await deployAndInitialize();
    // Assume userAccount has tokens to transfer

    const amountToTransfer = UInt64.from(200);
    const senderSignature = new Signature(); // Signature needs to be obtained based on the logic of transferring

    (await (await Mina.transaction(adminAccount, () => {
      zkApp.transfer(userAccount, adminAccount, amountToTransfer, senderSignature);
    })).send()).wait();

    const senderBalance = zkApp.getBalance(userAccount);
    const receiverBalance = zkApp.getBalance(adminAccount);
    // Assert sender balance decreased and receiver balance increased by amountToTransfer
    // Note: The actual balance checks would depend on the initial state of the test accounts
  });
});
export { TokenContract };

