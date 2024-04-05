import { Bool, Field, Signature, Struct } from "o1js";
import { Signer } from "./Signer";


const EMPTY_SIGNATURE = "";

export class SignerProof extends Struct({
    signer: Signer,
    signedSignerPublicKey: Signature
  }) {
    constructor(
      signer: Signer,
      signedSignerPublicKey: Signature
    ) {
      super({
        signer,
        signedSignerPublicKey
      });
      this.signer = signer;
      this.signedSignerPublicKey = signedSignerPublicKey;
    };

    static empty(): SignerProof {
      return new SignerProof(
        Signer.empty(),
        Signature.fromBase58(EMPTY_SIGNATURE)
      );
    };
  };