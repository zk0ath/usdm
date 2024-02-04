import { Bool, Field, Signature, Struct } from "o1js";
import { Signer } from "./Signer";
import { Block } from "./Block";

const EMPTY_SIGNATURE = "DUMMY_SIGNATURE";

export class BlockProof extends Struct({
    signer: Signer,
    signedBlockCommitment: Signature,
    signedBlockHeight: Field
  }) {
    constructor(
      signer: Signer,
      signedBlockCommitment: Signature,
      signedBlockHeight: Field
    ) {
      super({
        signer,
        signedBlockCommitment,
        signedBlockHeight
      });
      this.signer = signer;
      this.signedBlockCommitment = signedBlockCommitment;
      this.signedBlockHeight = signedBlockHeight;
    };
  
    static empty(): BlockProof {
      return new BlockProof(
        Signer.empty(),
        Signature.fromBase58(EMPTY_SIGNATURE),
        Field(0)
      );
    };
  
    isEmpty(): Bool {
      return this.signer.isEmpty();
    };
  };