import {
    AccountUpdate,
    Field,
    MerkleTree,
    Mina,
    PrivateKey,
    Poseidon,
    PublicKey,
    Reducer,
    Signature
} from 'o1js';
import { Signer } from './Signer';
import { BridgeContract } from './Contract';
import { Block } from './Block';
import { SignerMerkleWitnessClass } from './SignerMerkleWitnessClass';
import { CelestiaMerkleWitnessClass } from './CelestiaMerkleWitnessClass';
import { BlockProof } from './BlockProof';


let proofsEnabled = false;

const MAX_CELESTIA_MERKLE_TREE_HEIGHT = 21; // The Celestia merkle tree can hold at most 2^20 (1048576) block hashes.
const MAX_BLOCK_COUNT = 1048576; // Max 1048576 blocks are supported. This number can be increased if needed, but do not forget to change the MAX_CELESTIA_MERKLE_TREE_HEIGHT as well.
const MAX_SIGNER_MERKLE_TREE_HEIGHT = 20; // The Signer merkle tree can hold at most 2^20 (1048576) signers. This is much more than the SIGNER_COUNT, since we do not remove a node from the Signer merkle tree when a Signer is removed.
const MAX_SIGNER_COUNT = 200; // Max 200 signers are supported. This number can be increased if needed.

const celestiaData: string[] = [];

const FORMATTED_CHAR_LENGTH = 4;

function formatChar(_char: string) {
    let char = _char;

    while (char.length < FORMATTED_CHAR_LENGTH)
        char = '0' + char;

    return char;
};

function formatCharCode(charCode: number) {
    return (charCode % Math.pow(10, FORMATTED_CHAR_LENGTH + 1)).toString();
};

function stringToBigInt(str: string) {
    let resultString = '';

    str.trim().split('').forEach(char => {
        resultString += formatChar(formatCharCode(char.charCodeAt(0)));
    });

    return BigInt(resultString) % Field.ORDER;
};

function pushToCelestia(str: string): number {
    celestiaData.push(str);
    return celestiaData.length - 1;
};

function signBlock(
    signerPrivateKey: PrivateKey,
    block: Block
): Signature {
    // console.log(stringToBigInt(celestiaData[0]));
    // console.log(block.data.toBigInt());
    // console.log(block.height.toBigInt());

    const dataPoint = celestiaData.find((each, index) => stringToBigInt(each) == block.commitment.toBigInt() && BigInt(index) == block.height.toBigInt());
    if (!dataPoint)
        throw new Error(`No data point found for this height.`);

    return Signature.create(signerPrivateKey, [block.hash()]);
};

function signSigner(
    signerPrivateKey: PrivateKey,
    signer: Signer
): Signature {
    return Signature.create(signerPrivateKey, [signer.hash()]);
};

describe('Test', () => {
    let deployerAccount: PublicKey,
        deployerKey: PrivateKey,
        senderAccount: PublicKey,
        senderKey: PrivateKey,
        zkAppAddress: PublicKey,
        zkAppPrivateKey: PrivateKey,
        zkApp: BridgeContract;

    const NAMESPACE = stringToBigInt('Photon');
    const SIGNER_COUNT = 5;
    const signerPrivateKeys = Array.from({ length: SIGNER_COUNT + 1 }, _ => PrivateKey.random()); // An extra one for the new Signer test

    beforeAll(async () => {
        if (proofsEnabled) await BridgeContract.compile();
    });

    beforeEach(async () => {
        const Local = Mina.LocalBlockchain({ proofsEnabled });
        Mina.setActiveInstance(Local);
        ({ privateKey: deployerKey, publicKey: deployerAccount } =
            Local.testAccounts[0]);
        ({ privateKey: senderKey, publicKey: senderAccount } =
            Local.testAccounts[1]);
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        zkApp = new BridgeContract(zkAppAddress);

        for (let i = 2; i < 2 + SIGNER_COUNT; i++)
            signerPrivateKeys[i - 2] = Local.testAccounts[i].privateKey;

        await localDeploy();

        // Initialize the contract with the given values

        const celestiaTree = new MerkleTree(MAX_CELESTIA_MERKLE_TREE_HEIGHT);
        const signerTree = new MerkleTree(MAX_SIGNER_MERKLE_TREE_HEIGHT);

        for (let i = 0; i < 100; i++)
            celestiaTree.setLeaf(BigInt(i), Block.empty().hash());

        for (let i = 0; i < SIGNER_COUNT; i++) {
            signerTree.setLeaf(BigInt(i), new Signer(
                signerPrivateKeys[i].toPublicKey(),
                SignerMerkleWitnessClass.empty(), // Hash does not depend on the witness, so this is fine.
                Field(0)
            ).hash());
        }
        for (let i = SIGNER_COUNT; i < MAX_SIGNER_COUNT; i++)
            signerTree.setLeaf(BigInt(i), Signer.empty().hash());

        const txn = await Mina.transaction(deployerAccount, () => {
            zkApp.initialize(
                Field(NAMESPACE),
                celestiaTree.getRoot(),
                Field(SIGNER_COUNT),
                signerTree.getRoot()
            );
        });
        await txn.prove();
        await txn.sign([deployerKey, zkAppPrivateKey]).send();
    });

    async function localDeploy() {
        const txn = await Mina.transaction(deployerAccount, () => {
            AccountUpdate.fundNewAccount(deployerAccount);
            zkApp.deploy();
        });
        await txn.prove();
        // this tx needs .signBlock(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployerKey, zkAppPrivateKey]).send();
    };

    it('Test 1: Initialize the Contract with the given values and check the state is updated as expected.', async () => {
        // No need to send and transactions as there is beforeEach call doing the initilization.

        const celestiaTree = new MerkleTree(MAX_CELESTIA_MERKLE_TREE_HEIGHT);
        const signerTree = new MerkleTree(MAX_SIGNER_MERKLE_TREE_HEIGHT);

        for (let i = 0; i < 100; i++)
            celestiaTree.setLeaf(BigInt(i), Block.empty().hash());

        for (let i = 0; i < SIGNER_COUNT; i++) {
            signerTree.setLeaf(BigInt(i), new Signer(
                signerPrivateKeys[i].toPublicKey(),
                SignerMerkleWitnessClass.empty(), // Hash does not depend on the witness, so this is fine.
                Field(0)
            ).hash());
        }
        for (let i = SIGNER_COUNT; i < MAX_SIGNER_COUNT; i++)
            signerTree.setLeaf(BigInt(i), Signer.empty().hash());

        expect(zkApp.celestiaBlocksTree.get()).toEqual(celestiaTree.getRoot());
        expect(zkApp.signerCount.get()).toEqual(Field(SIGNER_COUNT));
        expect(zkApp.signersTree.get()).toEqual(signerTree.getRoot());
        expect(zkApp.signersTreeAccumulator.get()).toEqual(Reducer.initialActionState);
    });
});