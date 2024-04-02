import { Field, Poseidon, Struct } from "o1js";
import { CelestiaMerkleWitnessClass } from "./CelestiaMerkleWitnessClass";

export class Block extends Struct({
    commitment: Field,
    height: Field,
    witness: CelestiaMerkleWitnessClass
  }) {
    constructor(
      commitment: Field,
      height: Field,
      witness: CelestiaMerkleWitnessClass
    ) {
      super({
        commitment,
        height,
        witness
      });
      this.commitment = commitment;
      this.height = height;
      this.witness = witness;
    };

    static empty(): Block {
      return new Block(
        Field(0),
        Field(0),
        CelestiaMerkleWitnessClass.empty()
      );
    };

    hash(): Field {
      return Poseidon.hash([this.commitment, this.height]);
    };
  };