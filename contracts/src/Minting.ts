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
  } from 'o1js';
  
  const tokenSymbol = 'USDM';
  
  export class MintingContract extends SmartContract {
    @state(UInt64) totalSupply = State<UInt64>();
  
    deploy(args: DeployArgs) {
      super.deploy(args);
  
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

  }
  