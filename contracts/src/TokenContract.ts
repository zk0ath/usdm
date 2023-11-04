import {
  SmartContract,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
  UInt64,
  PublicKey,
  Signature,
  Mina
} from 'o1js';

const tokenSymbol = 'USDM';

export class TokenContract extends SmartContract {
  @state(UInt64) totalSupply = State<UInt64>();

  deploy() {
    super.deploy();

    const permissionToEdit = Permissions.proof();

    this.account.permissions.set({
      ...Permissions.default(),
      editState: permissionToEdit,
      setTokenSymbol: permissionToEdit,
      send: permissionToEdit,
      receive: permissionToEdit,
    });
  }

  @method init() {
    super.init();
    this.account.tokenSymbol.set(tokenSymbol);
    this.totalSupply.set(UInt64.zero);
  }

  @method mint(
    receiverAddress: PublicKey,
    amount: UInt64,
    adminSignature: Signature
  ) {
    let currentTotalSupply = this.totalSupply.get();
    this.totalSupply.assertEquals(currentTotalSupply);

    let newTotalSupply = currentTotalSupply.add(amount);

    adminSignature
      .verify(
        this.address,
        amount.toFields().concat(receiverAddress.toFields())
      )
      .assertTrue();

    this.token.mint({
      address: receiverAddress,
      amount,
    });

    this.totalSupply.set(newTotalSupply);
  }

  @method burn(
    burnerAddress: PublicKey,
    amount: UInt64,
    adminSignature: Signature
  ) {
    const burnerBalance = this.getBalance(burnerAddress);
    if (burnerBalance < amount.toBigInt()) {
      throw new Error('Burner does not have enough balance to burn the specified amount of tokens.');
    }

    let currentTotalSupply = this.totalSupply.get();
    this.totalSupply.assertEquals(currentTotalSupply);

    currentTotalSupply.sub(amount).assertGreaterThanOrEqual(UInt64.zero);

    adminSignature
      .verify(
        this.address,
        amount.toFields().concat(burnerAddress.toFields())
      )
      .assertTrue();

    this.token.burn({
      address: burnerAddress,
      amount,
    });

    let newTotalSupply = currentTotalSupply.sub(amount);
    this.totalSupply.set(newTotalSupply);
  }

  @method transfer(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64,
    senderSignature: Signature
  ) {
    const senderBalance = this.getBalance(senderAddress);
    if (senderBalance < amount.toBigInt()) {
      throw new Error('Sender does not have enough balance to transfer the specified amount of tokens.');
    }
    
    senderSignature
      .verify(
        this.address,
        amount.toFields().concat(senderAddress.toFields()).concat(receiverAddress.toFields())
      )
      .assertTrue();

    // Then perform the transfer by calling the built-in token transfer function
    this.token.send({
      from: senderAddress,
      to: receiverAddress,
      amount,
    });
  }

  @method getBalance(address: PublicKey) : bigint {
    return Mina.getBalance(address).toBigInt();
  }
}
