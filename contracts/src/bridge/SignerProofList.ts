import { PublicKey, Struct } from "o1js";
import { SignerProof } from "./SignerProof";

// SignerProofList holds an array of Proofs with length MAX_SIGNER_COUNT
export class SignerProofList extends Struct({
    proofs: Array.from({ length: 200 }, () => SignerProof),
    signers: Array.from({ length: 200 }, () => PublicKey) // A signer public key array to keep track if the corresponding SignerProof Signer has already signed or not.
  }) {
    constructor(
      proofs: SignerProof[]
    ) {
      const signers = Array.from({ length: 200 }, () => PublicKey.fromBase58("B62qrhCn7DK2b4pzbJCAxxBN1cyVAyLgN2JZDe67EV76oneJbyiCfDh"));
  
      super({
        proofs,
        signers
      });
  
      this.proofs = fillWithEmptySignerProofs(proofs.splice(0, 200));
      this.signers = signers;
    };
  };


  // A utility function to fill the given BlockProof array with empty SignerProofs until it reaches MAX_SIGNER_COUNT.
function fillWithEmptySignerProofs(
    [...proofs]: SignerProof[]
  ): SignerProof[]{
    const emptyProof = SignerProof.empty();
  
    for (let i = proofs.length; i < 200; i++)
      proofs[i] = emptyProof;
    return proofs;
  };