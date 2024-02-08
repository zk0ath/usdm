import { Struct } from "o1js";
import { BlockProof } from "./BlockProof";

export class BlockProofList extends Struct({
    proofs: Array.from({ length: MAX_SIGNER_COUNT }, () => BlockProof),
    signers: Array.from({ length: MAX_SIGNER_COUNT }, () => PublicKey) // A signer public key array to keep track if the corresponding BlockProof Signer has already signed or not.
  }) {
    constructor(
      proofs: BlockProof[]
    ) {
      const signers = Array.from({ length: MAX_SIGNER_COUNT }, () => PublicKey.fromBase58(EMPTY_PUBLIC_KEY));
  
      super({
        proofs,
        signers
      });
  
      this.proofs = fillWithEmptyBlockProofs(proofs.splice(0, MAX_SIGNER_COUNT));
      this.signers = signers;
    };
  };