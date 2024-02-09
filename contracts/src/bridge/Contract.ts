import { Field, Reducer, SmartContract, State, method, state } from "o1js";
import { Signer } from "./Signer";

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

  };