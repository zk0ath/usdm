import { MerkleTree, MerkleWitness } from "o1js";

const celestiaEmptyTree = new MerkleTree(21);

export class CelestiaMerkleWitnessClass extends MerkleWitness(21) {

    static empty(): CelestiaMerkleWitnessClass {

      return new CelestiaMerkleWitnessClass(celestiaEmptyTree.getWitness(0n));

    };

  };