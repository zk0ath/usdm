import { Mina, PrivateKey, UInt64, Signature, PublicKey } from 'o1js';
import fs from 'fs/promises';
import { TokenContract } from './TokenContract';

let deployAlias = process.argv[2];
if (!deployAlias)
    throw Error(`Missing <deployAlias> argument.

Usage:
node build/src/TokenContractApi.js <deployAlias>
`);
Error.stackTraceLimit = 1000;

type Config = {
    deployAliases: Record<
        string,
        {
            url: string;
            keyPath: string;
            fee: string;
            feepayerKeyPath: string;
            feepayerAlias: string;
        }
    >;
};
let configJson: Config = JSON.parse(await fs.readFile('config.json', 'utf8'));
let config = configJson.deployAliases[deployAlias];
let feepayerKeysBase58: { privateKey: string; publicKey: string } = JSON.parse(
    await fs.readFile(config.feepayerKeyPath, 'utf8')
);
let zkAppKeysBase58: { privateKey: string; publicKey: string } = JSON.parse(
    await fs.readFile(config.keyPath, 'utf8')
);
let feepayerKey = PrivateKey.fromBase58(feepayerKeysBase58.privateKey);
let zkAppKey = PrivateKey.fromBase58(zkAppKeysBase58.privateKey);

const Network = Mina.Network(config.url);
const fee = Number(config.fee) * 1e9; // in nanomina (1 billion = 1.0 mina)
Mina.setActiveInstance(Network);
let feepayerAddress = feepayerKey.toPublicKey();
let zkAppAddress = zkAppKey.toPublicKey();
let zkApp = new TokenContract(zkAppAddress);

let sentTx;
console.log('compile the contract...');
await TokenContract.compile();
try {
    console.log('build transaction and create proof...');
    const signature = Signature.create(
        zkAppKey,
        UInt64.from(1000).toFields().concat(zkAppAddress.toFields())
      );
    let tx = await Mina.transaction({ sender: feepayerAddress, fee }, () => {
        zkApp.mint(feepayerAddress, UInt64.from(1000), signature);
    });
    await tx.prove();
    console.log('send transaction...');
    sentTx = await tx.sign([feepayerKey]).send();
} catch (e) {
    console.log(e);
}
if (sentTx?.hash() !== undefined) {
    console.log(`
  Success! Update transaction sent.
  
  Your smart contract state will be updated
  as soon as the transaction is included in a block:
  https://berkeley.minaexplorer.com/transaction/${sentTx.hash()}
  `);
}
