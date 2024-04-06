import { PublicKey, Struct } from "o1js";
import { BlockProof } from "./BlockProof";

export class BlockProofList extends Struct({
    proofs: Array.from({ length: 200 }, () => BlockProof),
    signers: Array.from({ length: 200 }, () => PublicKey) // A signer public key array to keep track if the corresponding BlockProof Signer has already signed or not.
  }) {
    constructor(
      proofs: BlockProof[]
    ) {
      const signers = Array.from({ length: 200 }, () => PublicKey.fromBase58("EMPTY"));
  
      super({
        proofs,
        signers
      });
  
      this.proofs = fillWithEmptyBlockProofs(proofs.splice(0, 200));
      this.signers = signers;
    };
  };