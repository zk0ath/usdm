import { TokenContract } from './TokenContract';
import {
  State,
  state,
  UInt64,
  Bool,
  SmartContract,
  Mina,
  PrivateKey,
  AccountUpdate,
  method,
  PublicKey,
  Permissions,
  VerificationKey,
  Field,
  Experimental,
  Int64,
  TokenId,
} from 'o1js';
class ZkAppB extends SmartContract {
}

class ZkAppC extends SmartContract {
}
const tokenSymbol = 'TOKEN';

let feePayerKey: PrivateKey;
let feePayer: PublicKey;
let tokenZkappKey: PrivateKey;
let tokenZkappAddress: PublicKey;
let tokenZkapp: TokenContract;
let tokenId: Field;

let zkAppBKey: PrivateKey;
let zkAppBAddress: PublicKey;
let zkAppB: ZkAppB;

let zkAppCKey: PrivateKey;
let zkAppCAddress: PublicKey;
let zkAppC: ZkAppC;

function setupAccounts() {
  let Local = Mina.LocalBlockchain({
    proofsEnabled: true,
    enforceTransactionLimits: false,
  });
  Mina.setActiveInstance(Local);
  feePayerKey = Local.testAccounts[0].privateKey;
  feePayer = Local.testAccounts[0].publicKey;

  tokenZkappKey = PrivateKey.random();
  tokenZkappAddress = tokenZkappKey.toPublicKey();

  tokenZkapp = new TokenContract(tokenZkappAddress);
  tokenId = tokenZkapp.token.id;

  zkAppBKey = Local.testAccounts[1].privateKey;
  zkAppBAddress = zkAppBKey.toPublicKey();
  zkAppB = new ZkAppB(zkAppBAddress, tokenId);

  zkAppCKey = Local.testAccounts[2].privateKey;
  zkAppCAddress = zkAppCKey.toPublicKey();
  zkAppC = new ZkAppC(zkAppCAddress, tokenId);
  return Local;
}


async function setupLocal() {
  setupAccounts();
  let tx = await Mina.transaction(feePayer, () => {
    let feePayerUpdate = AccountUpdate.fundNewAccount(feePayer);
    feePayerUpdate.send({
      to: tokenZkappAddress,
      amount: Mina.accountCreationFee(),
    });
    tokenZkapp.deploy();
  });
  tx.sign([tokenZkappKey, feePayerKey]);
  await tx.send();
}

async function setupLocalProofs() {
  let Local = setupAccounts();
  zkAppC = new ZkAppC(zkAppCAddress, tokenId);
  // don't use proofs for the setup, takes too long to do this every time
  Local.setProofsEnabled(false);
  let tx = await Mina.transaction({ sender: feePayer }, () => {
    let feePayerUpdate = AccountUpdate.fundNewAccount(feePayer, 3);
    feePayerUpdate.send({
      to: tokenZkappAddress,
      amount: Mina.accountCreationFee(),
    });
    tokenZkapp.deploy();
    tokenZkapp.deployTokenContract(zkAppBAddress, ZkAppB._verificationKey!);
    tokenZkapp.deployTokenContract(zkAppCAddress, ZkAppC._verificationKey!);
  });
  await tx.prove();
  tx.sign([tokenZkappKey, zkAppBKey, zkAppCKey, feePayerKey]);
  await tx.send();
  Local.setProofsEnabled(true);
}

describe('TokenContract', () => {
  beforeAll(async () => {
    await TokenContract.compile();
  });

  describe('Signature Authorization', () => {
    describe('Token Contract Creation/Deployment', () => {
      beforeEach(async () => {
        await setupLocal();
      });

      test('correct token id can be derived with an existing token owner', () => {
        expect(tokenId).toEqual(TokenId.derive(tokenZkappAddress));
      });

      test('deployed token contract exists in the ledger', () => {
        expect(Mina.getAccount(tokenZkappAddress, tokenId)).toBeDefined();
      });

      test('setting a valid token symbol on a token contract', async () => {
        await (
          await Mina.transaction({ sender: feePayer }, () => {
            let tokenZkapp = AccountUpdate.createSigned(tokenZkappAddress);
            tokenZkapp.account.tokenSymbol.set(tokenSymbol);
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        const symbol = Mina.getAccount(tokenZkappAddress).tokenSymbol;
        expect(tokenSymbol).toBeDefined();
        expect(symbol).toEqual(tokenSymbol);
      });
    })

    describe('Mint token', () => {
      beforeEach(async () => {
        await setupLocal();
      });

      test('token contract can successfully mint and updates the balances in the ledger (signature)', async () => {
        await (
          await Mina.transaction({ sender: feePayer }, () => {
            AccountUpdate.fundNewAccount(feePayer);
            tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        expect(
          Mina.getBalance(zkAppBAddress, tokenId).value.toBigInt()
        ).toEqual(100_000n);
      });

      test('minting should fail if overflow occurs ', async () => {
        await Mina.transaction(feePayer, () => {
          AccountUpdate.fundNewAccount(feePayer);
          tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000_000_000));
          tokenZkapp.requireSignature();
        }).catch((e) => {
          expect(e).toBeDefined();
        });
      });
    });

    describe('Burn token', () => {
      beforeEach(async () => {
        await setupLocal();
      });
      test('token contract can successfully burn and updates the balances in the ledger (signature)', async () => {
        await (
          await Mina.transaction(feePayer, () => {
            AccountUpdate.fundNewAccount(feePayer);
            tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        await (
          await Mina.transaction(feePayer, () => {
            tokenZkapp.burn(zkAppBAddress, UInt64.from(10_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([zkAppBKey, feePayerKey, tokenZkappKey])
          .send();
        expect(
          Mina.getBalance(zkAppBAddress, tokenId).value.toBigInt()
        ).toEqual(90_000n);
      });

      test('throw error if token owner burns more tokens than token account has', async () => {
        await (
          await Mina.transaction(feePayer, () => {
            AccountUpdate.fundNewAccount(feePayer);
            tokenZkapp.mint(zkAppBAddress, UInt64.from(1_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        let tx = (
          await Mina.transaction(feePayer, () => {
            tokenZkapp.burn(zkAppBAddress, UInt64.from(10_000));
            tokenZkapp.requireSignature();
          })
        ).sign([zkAppBKey, feePayerKey, tokenZkappKey]);
        await expect(tx.send()).rejects.toThrow();
      });
    });

    describe('Transfer', () => {
      beforeEach(async () => {
        await setupLocal();
      });

      test('change the balance of a token account after sending', async () => {
        let tx = await Mina.transaction(feePayer, () => {
          AccountUpdate.fundNewAccount(feePayer);
          tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000));
          tokenZkapp.requireSignature();
        });
        await tx.sign([feePayerKey, tokenZkappKey]).send();

        tx = await Mina.transaction(feePayer, () => {
          AccountUpdate.fundNewAccount(feePayer);
          tokenZkapp.token.send({
            from: zkAppBAddress,
            to: zkAppCAddress,
            amount: UInt64.from(10_000),
          });
          AccountUpdate.attachToTransaction(tokenZkapp.self);
          tokenZkapp.requireSignature();
        });
        tx.sign([zkAppBKey, zkAppCKey, feePayerKey, tokenZkappKey]);
        await tx.send();

        expect(
          Mina.getBalance(zkAppBAddress, tokenId).value.toBigInt()
        ).toEqual(90_000n);
        expect(
          Mina.getBalance(zkAppCAddress, tokenId).value.toBigInt()
        ).toEqual(10_000n);
      });

      test('should error creating a token account if no account creation fee is specified', async () => {
        await (
          await Mina.transaction(feePayer, () => {
            AccountUpdate.fundNewAccount(feePayer);
            tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        let tx = (
          await Mina.transaction(feePayer, () => {
            tokenZkapp.token.send({
              from: zkAppBAddress,
              to: zkAppCAddress,
              amount: UInt64.from(10_000),
            });
            AccountUpdate.attachToTransaction(tokenZkapp.self);
            tokenZkapp.requireSignature();
          })
        ).sign([zkAppBKey, feePayerKey, tokenZkappKey]);

        await expect(tx.send()).rejects.toThrow();
      });

      test('should error if sender sends more tokens than they have', async () => {
        await (
          await Mina.transaction(feePayer, () => {
            AccountUpdate.fundNewAccount(feePayer);
            tokenZkapp.mint(zkAppBAddress, UInt64.from(100_000));
            tokenZkapp.requireSignature();
          })
        )
          .sign([feePayerKey, tokenZkappKey])
          .send();
        let tx = (
          await Mina.transaction(feePayer, () => {
            tokenZkapp.token.send({
              from: zkAppBAddress,
              to: zkAppCAddress,
              amount: UInt64.from(100_000),
            });
            AccountUpdate.attachToTransaction(tokenZkapp.self);
            tokenZkapp.requireSignature();
          })
        ).sign([zkAppBKey, feePayerKey, tokenZkappKey]);
        await expect(tx.send()).rejects.toThrow();
      });
    });
  })
});
export { TokenContract };

