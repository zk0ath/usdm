import { Bool, Field, Poseidon, PublicKey, Struct } from "o1js";
import { SignerMerkleWitnessClass } from "./SignerMerkleWitnessClass";

export class Signer extends Struct({
    key: PublicKey,
    witness: SignerMerkleWitnessClass,
    signingCount: Field
  }) {
    constructor(
      key: PublicKey,
      witness: SignerMerkleWitnessClass,
      signingCount: Field
    ) {
      super({
        key,
        witness,
        signingCount
      });
      this.key = key;
      this.witness = witness;
      this.signingCount = signingCount;
    };

    static empty() {
      return new Signer(
        PublicKey.fromBase58("PUBLIC_KEY_PLACEHOLDER"),
        SignerMerkleWitnessClass.empty(),
        Field(0)
      );
    };

    check(
      root: Field
    ): Bool {
      return root.equals(
        this.witness.calculateRoot(this.hash())
      );
    };

    hash(): Field {
      return Poseidon.hash(this.key.toFields().concat([this.signingCount]));
    };

    isEmpty(): Bool {
      return this.key.equals(PublicKey.fromBase58("PUBLIC_KEY_PLACEHOLDER"));
    };

    sign(): Signer {
      return new Signer(
        this.key,
        this.witness,
        this.signingCount.add(Field(1))
      );
    };
  };