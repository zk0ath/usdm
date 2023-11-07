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
  VerificationKey,Signature, fetchAccount, Bool
} from 'o1js';


export class TokenContract extends SmartContract {
  @state(UInt64) totalAmountInCirculation = State<UInt64>();

  init() {
    super.init();
    // Set the total amount in circulation to match the total supply
    this.account.tokenSymbol.set("USDM");
    this.totalAmountInCirculation.set(UInt64.zero);
  
    // Set more restrictive permissions for the smart contract
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
      send: Permissions.proof(),
      receive: Permissions.proof()
    });
  }

  @method mint(receiverAddress: PublicKey, amount: UInt64) {
    let totalAmountInCirculation = this.totalAmountInCirculation.get();

    this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
    let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);
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

    let newTotalAmountInCirculation = totalAmountInCirculation.sub(amount);

    this.token.burn({
      address: senderAddress,
      amount,
    });

    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method transfer(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64
  ) {
    const senderBalance = this.getBalance(senderAddress);
    
    senderBalance.assertGreaterThanOrEqual(amount, "Sender does not have enough balance");

    // Then perform the transfer by calling the built-in token transfer function
    this.token.send({
      from: senderAddress,
      to: receiverAddress,
      amount,
    });
  }

  @method getBalance(address: PublicKey): UInt64 {
    let accountUpdate = AccountUpdate.create(address, this.token.id);
    let balance = accountUpdate.account.balance.get();
    accountUpdate.account.balance.assertEquals(
      accountUpdate.account.balance.get()
    );
    return balance;
  }
}
