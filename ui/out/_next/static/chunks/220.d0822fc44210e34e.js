"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[220],{

/***/ 7220:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenContract: function() { return /* binding */ TokenContract; }
/* harmony export */ });
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);
o1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

const tokenSymbol = 'USDM';
class TokenContract extends o1js__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    constructor() {
        super(...arguments);
        this.SUPPLY = o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM.from(10n ** 18n);
        this.totalAmountInCirculation = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
    }
    deployTokenContract(address, verificationKey) {
        let tokenId = this.token.id;
        let zkapp = o1js__WEBPACK_IMPORTED_MODULE_0__/* .AccountUpdate */ .nx.defaultAccountUpdate(address, tokenId);
        this.approve(zkapp);
        zkapp.account.permissions.set(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.default());
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
        receiver.account.isNew.assertEquals((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Bool */ .tW)(true));
        this.balance.subInPlace(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.accountCreationFee());
        // Set the total amount in circulation to match the total supply
        this.totalAmountInCirculation.set(this.SUPPLY);
        // Set more restrictive permissions for the smart contract
        this.account.permissions.set({
            ...o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.default(),
            editState: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.proofOrSignature(),
            send: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.proof(),
            receive: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.proof(),
            access: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Permissions */ .Pl.proofOrSignature(),
        });
    }
    mint(receiverAddress, amount) {
        let totalAmountInCirculation = this.totalAmountInCirculation.get();
        this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
        let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);
        // Ensure minting does not exceed total supply
        newTotalAmountInCirculation.assertGreaterThan(this.SUPPLY, "Cannot mint more than the total supply");
        this.token.mint({
            address: receiverAddress,
            amount,
        });
        // Update the total amount in circulation after minting
        this.totalAmountInCirculation.set(newTotalAmountInCirculation);
    }
    burn(senderAddress, amount) {
        let totalAmountInCirculation = this.totalAmountInCirculation.get();
        this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
        // Ensure we do not burn more than what is in circulation
        totalAmountInCirculation.assertGreaterThanOrEqual(amount, "Cannot burn more tokens than are in circulation");
        let newTotalAmountInCirculation = totalAmountInCirculation.sub(amount);
        this.token.burn({
            address: senderAddress,
            amount,
        });
        // Update the total amount in circulation after the burn
        this.totalAmountInCirculation.set(newTotalAmountInCirculation);
    }
    transfer(senderAddress, receiverAddress, amount, senderSignature) {
        const senderBalance = this.getBalance(senderAddress);
        senderBalance.assertLessThan(amount);
        senderSignature
            .verify(this.address, amount.toFields().concat(senderAddress.toFields()).concat(receiverAddress.toFields()))
            .assertTrue();
        // Then perform the transfer by calling the built-in token transfer function
        this.token.send({
            from: senderAddress,
            to: receiverAddress,
            amount,
        });
    }
    getBalance(address) {
        let accountUpdate = o1js__WEBPACK_IMPORTED_MODULE_0__/* .AccountUpdate */ .nx.create(address);
        let balance = accountUpdate.account.balance.get();
        accountUpdate.account.balance.assertEquals(balance);
        return balance;
    }
}
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM),
    __metadata("design:type", Object)
], TokenContract.prototype, "totalAmountInCirculation", void 0);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh, o1js__WEBPACK_IMPORTED_MODULE_0__/* .VerificationKey */ .Wh]),
    __metadata("design:returntype", void 0)
], TokenContract.prototype, "deployTokenContract", null);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh, o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM]),
    __metadata("design:returntype", void 0)
], TokenContract.prototype, "mint", null);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh, o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM]),
    __metadata("design:returntype", void 0)
], TokenContract.prototype, "burn", null);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Signature */ .Pc]),
    __metadata("design:returntype", void 0)
], TokenContract.prototype, "transfer", null);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh]),
    __metadata("design:returntype", o1js__WEBPACK_IMPORTED_MODULE_0__/* .UInt64 */ .zM)
], TokenContract.prototype, "getBalance", null);
//# sourceMappingURL=TokenContract.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);