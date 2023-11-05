import {
  State,
  state,
  UInt64,
  Bool,
  SmartContract,
  Mina,
  PrivateKey,
  AccountUpdate,
  method,
  PublicKey,
  Permissions,
  VerificationKey,
  Field,
  Experimental,
  Int64,
  TokenId, Signature, Provable
} from 'o1js';

const tokenSymbol = 'USDM';

export class TokenContract extends SmartContract {
  SUPPLY = UInt64.from(10n ** 18n);
  @state(UInt64) totalAmountInCirculation = State<UInt64>();

  @method deployTokenContract(address: PublicKey, verificationKey: VerificationKey) {
    let tokenId = this.token.id;
    let zkapp = AccountUpdate.defaultAccountUpdate(address, tokenId);
    this.approve(zkapp);
    zkapp.account.permissions.set(Permissions.default());
    zkapp.account.verificationKey.set(verificationKey);
    zkapp.requireSignature();
  }

  init() {
    super.init();
    let address = this.address;
    let receiver = this.token.mint({
      address,
      amount: this.SUPPLY,
    });
    receiver.account.isNew.assertEquals(Bool(true));
    this.balance.subInPlace(Mina.accountCreationFee());

    // Set the total amount in circulation to match the total supply
    this.totalAmountInCirculation.set(this.SUPPLY);

    // Set more restrictive permissions for the smart contract
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
      send: Permissions.proof(),
      receive: Permissions.proof(),
      access: Permissions.proofOrSignature(),
    });
  }

  @method mint(receiverAddress: PublicKey, amount: UInt64) {
    let totalAmountInCirculation = this.totalAmountInCirculation.get();

    this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
    let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);

    // Ensure minting does not exceed total supply
    newTotalAmountInCirculation.assertGreaterThan(
      this.SUPPLY,
      "Cannot mint more than the total supply"
    );
    this.token.mint({
      address: receiverAddress,
      amount,
    });

    // Update the total amount in circulation after minting
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method burn(senderAddress: PublicKey, amount: UInt64) {
    let totalAmountInCirculation = this.totalAmountInCirculation.get();
    this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);

    // Ensure we do not burn more than what is in circulation
    totalAmountInCirculation.assertGreaterThanOrEqual(
      amount,
      "Cannot burn more tokens than are in circulation"
    );

    let newTotalAmountInCirculation = totalAmountInCirculation.sub(amount);

    this.token.burn({
      address: senderAddress,
      amount,
    });

    // Update the total amount in circulation after the burn
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method transfer(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64,
    senderSignature: Signature
  ) {
    const senderBalance = this.getBalance(senderAddress);
    
    senderBalance.assertLessThan(amount)
    

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

  @method getBalance(address: PublicKey): UInt64 {
    let accountUpdate = AccountUpdate.create(address);
    let balance = accountUpdate.account.balance.get();
    accountUpdate.account.balance.assertEquals(balance);
    return balance;
  }
}
