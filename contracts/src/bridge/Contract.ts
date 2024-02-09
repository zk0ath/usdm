import { Bool, Field, Provable, Reducer, SmartContract, State, method, state } from "o1js";
import { Signer } from "./Signer";
import { Block } from "./Block";
import { BlockProof } from "./BlockProof";
import { BlockProofList } from "./BlockProofList";

export class BridgeContract extends SmartContract {
    @state(Field) celestiaNamespaceHash = State<Field>();
    @state(Field) celestiaBlocksTree = State<Field>();
    @state(Field) signerCount = State<Field>();
    @state(Field) signersTree = State<Field>();
    @state(Field) signersTreeAccumulator = State<Field>();
  
    reducer = Reducer({ actionType: Signer });
  
    init() {
      super.init();
      this.celestiaNamespaceHash.set(Field(0));
      this.celestiaBlocksTree.set(Field(0));
      this.signerCount.set(Field(0));
      this.signersTree.set(Field(0));
      this.signersTreeAccumulator.set(Reducer.initialActionState);
    };

    @method initialize(
        celestiaNamespaceHash: Field,
        initialCelestiaRootHash: Field,
        initialSignerCount: Field,
        initialSignerRootHash: Field
      ) {
        this.celestiaNamespaceHash.assertEquals(Field(0));
        this.celestiaBlocksTree.assertEquals(Field(0));
        this.signerCount.assertEquals(Field(0));
        this.signersTree.assertEquals(Field(0));
    
        this.celestiaNamespaceHash.set(celestiaNamespaceHash);
        this.celestiaBlocksTree.set(initialCelestiaRootHash);
        this.signerCount.set(initialSignerCount);
        this.signersTree.set(initialSignerRootHash);
      };


      @method update(
        newBlock: Block, // The new `Block` to be included in Celestia merkle tree.
        // Each proof is given as a different argument instead of an array because of a bug in the OCaml.
        proof1: BlockProof,  proof2: BlockProof,  proof3: BlockProof,  proof4: BlockProof,  proof5: BlockProof,  proof6: BlockProof,  proof7: BlockProof,  proof8: BlockProof,  proof9: BlockProof,  proof10: BlockProof, proof11: BlockProof, proof12: BlockProof, proof13: BlockProof, proof14: BlockProof, proof15: BlockProof, proof16: BlockProof, proof17: BlockProof, proof18: BlockProof, proof19: BlockProof, proof20: BlockProof 
      ) {
        this.celestiaBlocksTree.assertEquals(this.celestiaBlocksTree.get());
        this.signerCount.assertEquals(this.signerCount.get());
        this.signersTree.assertEquals(this.signersTree.get());
        this.signersTreeAccumulator.assertEquals(this.signersTreeAccumulator.get());
    
        // const celestiaBlocksTree = this.celestiaBlocksTree.get();
        const signerCount = this.signerCount.get();
        const signersTree = this.signersTree.get();
        // const signersTreeAccumulator = this.signersTreeAccumulator.get();
    
        const newBlockProvers = new BlockProofList([
          proof1, proof2, proof3, proof4, proof5, proof6, proof7, proof8, proof9, proof10, proof11, proof12, proof13, proof14, proof15, proof16, proof17, proof18, proof19, proof20
        ]);
    
        signerCount.equals(Field(0)).assertEquals(Bool(false)); // There is at least 1 signer
    
        let allValid = Bool(true);
        let currSignerCount = Field(0); // Number of Signers signed this proof.
    
        for (let i = 0; i < 200; i++) {
          const proof = newBlockProvers.proofs[i];
    
          let countOfSigners = Field(0); // This should stay 0 for all signers if all signers are unique.
    
          // Go through the array to see if this public key is already added.
          for (let i = 0; i < 200; i++)
            countOfSigners = countOfSigners.add(
              Provable.if(
                newBlockProvers.signers[i].equals(proof.signer.key),
                Field(1),
                Field(0)
              )
            );
    
          newBlockProvers.signers[i] = proof.signer.key; // Used once, so add it to the list.
    
          allValid = allValid.and(
            Bool.or(
              proof.isEmpty(),
              Bool.and(
                proof.verify(
                  signersTree,
                  newBlock
                ),
                countOfSigners.equals(Field(0))
              )
            )
          );
    
          currSignerCount = currSignerCount.add(
            Provable.if(
              proof.isEmpty(),
              Field(0),
              Field(1)
            )
          );
    
          // This line is not working since right now you can only dispatch 100 Field elements inside a @method, and number of signers can be more than 100.
          // this.reducer.dispatch(proof.signer); // Update the signer state with the new `signingCount`.
        };
    
        allValid.assertEquals(Bool(true)); // Check no validity check has failed.
        currSignerCount.mul(Field(100)).assertGreaterThanOrEqual(signerCount.mul(Field(60))); // More than REQUIRED_MIN_SIGNING_RATIO_FOR_BLOCK_UPDATE % of signers should sign the `BlockProof`.
    
        // As we cannot dispatch more than 100 Field elements inside a @method, no need for this code right now.
        // The contract works as expected without the reducer logic, it just does not update the `signingCount` of the Signer nodes.
        // const { state: newSignersTree, actionState: newSignersTreeAccumulator } = this.reducer.reduce(
        //   this.reducer.getActions({ fromActionState: signersTreeAccumulator }), // The current accumulator state.
        //   Field, // State type - merkle root
        //   (state: Field, action: Signer) => {
        //     action = action.sign(); // Add 1 signing to the signer.
        //     return action.witness.calculateRoot(action.hash()); // Update the merkle tree state.
        //   },
        //   { state: signersTree, actionState: signersTreeAccumulator }
        // );
    
        const newCelestiaBlocksTree = newBlock.witness.calculateRoot(newBlock.hash()); // The new Celestia merkle tree root hash.
    
        this.celestiaBlocksTree.set(newCelestiaBlocksTree);
        // this.signersTree.set(newSignersTree);
        // this.signersTreeAccumulator.set(newSignersTreeAccumulator);
      };

  };