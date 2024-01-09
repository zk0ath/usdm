import {
  State,
  state,
  UInt64,
  SmartContract,
  Mina,
  AccountUpdate,
  method,
  PublicKey,
  Permissions,
  Signature,
  UInt32,
  DeployArgs,
  Field,
} from 'o1js';

export class TokenContract extends SmartContract {
  @state(Field) symbol = State<Field>();
  @state(UInt64) decimals = State<UInt64>();
  @state(UInt64) maxSupply = State<UInt64>();
  @state(PublicKey) owner = State<PublicKey>();
  @state(UInt64) totalAmountInCirculation = State<UInt64>();

  deploy(args?: DeployArgs) {
    super.deploy(args);

    this.account.permissions.set({
      ...Permissions.default(),
      access: Permissions.proofOrSignature(),
    });
  }

  @method initialize(symbol: Field, decimals: UInt64, maxSupply: UInt64) {
    this.symbol.set(symbol);
    this.decimals.set(decimals);
    this.maxSupply.set(maxSupply);
    this.owner.set(this.sender);
  }

  onlyOwner() {
    this.owner.getAndRequireEquals().assertEquals(this.sender);
  }

  @method mint(receiverAddress: PublicKey, amount: UInt64) {
    this.onlyOwner();
    const maxSupply = this.maxSupply.getAndRequireEquals();
    const circulatingSupply =
      this.totalAmountInCirculation.getAndRequireEquals();

    const newCirculatingSupply = circulatingSupply.add(amount);

    newCirculatingSupply.assertLessThanOrEqual(maxSupply);

    this.token.mint({
      address: receiverAddress,
      amount,
    });

    this.totalAmountInCirculation.set(newCirculatingSupply);
  }

  @method burn(burnerAddress: PublicKey, amount: UInt64) {
    this.onlyOwner();
    const maxSupply = this.maxSupply.getAndRequireEquals();
    const circulatingSupply =
      this.totalAmountInCirculation.getAndRequireEquals();

    const newCirculatingSupply = circulatingSupply.sub(amount);
    newCirculatingSupply.assertLessThanOrEqual(maxSupply);
    this.token.burn({
      address: burnerAddress,
      amount,
    });

    this.totalAmountInCirculation.set(newCirculatingSupply);
  }

  @method transfer(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64
  ) {
    this.token.send({ from: senderAddress, to: receiverAddress, amount });
  }

  @method getBalance(address: PublicKey): UInt64 {
    let accountUpdate = AccountUpdate.create(address, this.token.id);
    let balance = accountUpdate.account.balance.get();
    return balance;
  }
}
