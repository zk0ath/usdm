import { TokenContract } from './TokenContract';
import { UInt64, Mina, PrivateKey, PublicKey, Signature, AccountUpdate } from 'o1js';

describe('TokenContract', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    adminAccount: PublicKey,
    adminKey: PrivateKey,
    userAccount: PublicKey,
    userKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: TokenContract,
    proofsEnabled = false;

  beforeAll(async () => {
    if (proofsEnabled) await TokenContract.compile();
  });

  beforeEach(() => {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
    ({ privateKey: adminKey, publicKey: adminAccount } = Local.testAccounts[1]);
    ({ privateKey: userKey, publicKey: userAccount } = Local.testAccounts[2]);
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new TokenContract(zkAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
      zkApp.init();
    });
    await txn.prove();
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  it('deploys the TokenContract and initializes totalSupply', async () => {
    await localDeploy();
    const totalSupply = zkApp.totalSupply.get();
    expect(totalSupply).toEqual(UInt64.zero);
  });

  it('mints tokens and increases totalSupply', async () => {
    await localDeploy();
    const amountToMint = UInt64.from(1000);
    const adminSignature = adminKey.sign(zkAppAddress.toString() + amountToMint.toString() + userAccount.toString());

    const txn = await Mina.transaction(adminAccount, () => {
      zkApp.mint(userAccount, amountToMint, adminSignature);
    });
    await txn.prove();
    await txn.sign([adminKey]).send();

    const newTotalSupply = zkApp.totalSupply.get();
    expect(newTotalSupply).toEqual(amountToMint);
  });
});
