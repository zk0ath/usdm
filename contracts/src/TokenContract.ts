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
  UInt32
} from 'o1js';

export class TokenContract extends SmartContract {
  @state(UInt64) totalAmountInCirculation = State<UInt64>();
  @state(UInt32) mintNonce = State<UInt32>();
  @state(PublicKey) owner = State<PublicKey>();

  init() {
    super.init();
    const permissionToEdit = Permissions.proof();

    this.account.permissions.set({
      ...Permissions.default(),
      editState: permissionToEdit,
      setTokenSymbol: permissionToEdit,
      send: permissionToEdit,
      receive: permissionToEdit,
    });
    this.account.tokenSymbol.set("USDM3");
    this.totalAmountInCirculation.set(UInt64.zero);
    this.mintNonce.set(UInt32.zero);
    this.owner.set(this.address);
  }

  onlyOwner() {
    this.address.assertEquals(this.owner.get());
  }

  @method mint(receiverAddress: PublicKey, amount: UInt64, adminSignature: Signature) {
    this.onlyOwner();
    this.totalAmountInCirculation.assertEquals(this.totalAmountInCirculation.get());
    let totalAmountInCirculation = this.totalAmountInCirculation.get();
    this.mintNonce.assertEquals(this.mintNonce.get());
    let nonce = this.mintNonce.get();

    adminSignature
      .verify(
        this.address,
        amount.toFields().concat(...receiverAddress.toFields())
      )
      .assertTrue("Admin signature is invalid");

    this.token.mint({
      address: receiverAddress,
      amount,
    });

    let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);
    this.mintNonce.set(nonce.add(1));
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method burn(senderAddress: PublicKey, amount: UInt64, adminSignature: Signature) {
    this.onlyOwner();
    this.totalAmountInCirculation.assertEquals(this.totalAmountInCirculation.get());
    let totalAmountInCirculation = this.totalAmountInCirculation.get();

    
    adminSignature
      .verify(
        this.address,
        amount.toFields().concat(...senderAddress.toFields())
      )
      .assertTrue("Admin signature is invalid");

  
    this.token.burn({
      address: senderAddress,
      amount,
    });

    let newTotalAmountInCirculation = totalAmountInCirculation.sub(amount);
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method transfer(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64
  ) {
    this.onlyOwner();
    const senderBalance = this.getBalance(senderAddress);
    
    senderBalance.assertGreaterThanOrEqual(amount, "Sender does not have enough balance");

    this.token.send({
      from: senderAddress,
      to: receiverAddress,
      amount,
    });
  }

  @method getBalance(address: PublicKey): UInt64 {
    let accountUpdate = AccountUpdate.create(address, this.token.id);
    let balance = accountUpdate.account.balance.get();
    return balance;
  }
}
