import { Mina, PrivateKey, UInt64, Signature } from 'o1js';
import fs from 'fs/promises';
import { TokenContract } from './TokenContract';

// Utility function to read JSON file
async function readJsonFile<T>(filePath: string): Promise<T> {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent) as T;
}

// Configuration type
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
// todo: ask this to caner

// Validate and retrieve deployment alias from command line arguments
function getDeploymentAlias(): string {
    const deployAlias = process.argv[2];
    if (!deployAlias) {
        throw Error(`Missing <deployAlias> argument.\n\nUsage:\nnode build/src/TokenContractApi.js <deployAlias>\n`);
    }
    return deployAlias;
}

async function main() {
    Error.stackTraceLimit = 1000;
    const deployAlias = getDeploymentAlias();

    const configJson: Config = await readJsonFile<Config>('config.json');
    const config = configJson.deployAliases[deployAlias];

    const feepayerKeysBase58 = await readJsonFile<{ privateKey: string; publicKey: string }>(config.feepayerKeyPath);
    const zkAppKeysBase58 = await readJsonFile<{ privateKey: string; publicKey: string }>(config.keyPath);

    const feepayerKey = PrivateKey.fromBase58(feepayerKeysBase58.privateKey);
    const zkAppKey = PrivateKey.fromBase58(zkAppKeysBase58.privateKey);

    const Network = Mina.Network(config.url);
    const fee = Number(config.fee) * 1e9; // in nanomina (1 billion = 1.0 mina)
    Mina.setActiveInstance(Network);

    let zkAppAddress = zkAppKey.toPublicKey();
    let zkApp = new TokenContract(zkAppAddress);

    console.log('compile the contract...');
    await TokenContract.compile();

    try {
        console.log('build transaction and create proof...');
        const signature = Signature.create(
            zkAppKey,
            UInt64.from(1000).toFields().concat(zkAppAddress.toFields())
        );

        let tx = await Mina.transaction({ sender: feepayerKey.toPublicKey(), fee }, () => {
            zkApp.mint(feepayerKey.toPublicKey(), UInt64.from(1000), signature);
        });

        await tx.prove();
        console.log('send transaction...');
        const sentTx = await tx.sign([feepayerKey]).send();

        if (sentTx?.hash() !== undefined) {
            console.log(`
            Success! Update transaction sent.
            
            Your smart contract state will be updated
            as soon as the transaction is included in a block:
            https://berkeley.minaexplorer.com/transaction/${sentTx.hash()}
            `);
        }
    } catch (e) {
        console.log(e);
    }
}

main().catch((error) => console.error(error));
