import { MerkleTree, MerkleWitness } from "o1js";

const signerEmptyTree = new MerkleTree(20);
export class SignerMerkleWitnessClass extends MerkleWitness(20) {
    static empty(): SignerMerkleWitnessClass {
      return new SignerMerkleWitnessClass(signerEmptyTree.getWitness(0n));
    };
  };