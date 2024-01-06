const Bridge = artifacts.require("Bridge");
const MyUsdc = artifacts.require("MyUsdc");

contract("Bridge", accounts => {
    let bridge;
    let usdcMock;
    const owner = accounts[0];
    const user = accounts[1];

    before(async () => {
        usdcMock = await MyUsdc.new(owner);
        bridge = await Bridge.new(usdcMock.address);

        await usdcMock.mint(bridge.address, web3.utils.toBN("1000000"));
        await usdcMock.mint(user, web3.utils.toBN("1000"));
    });

    it("should allow users to deposit USDC tokens", async () => {
        const recipient = "B62qpzUkW2UkoqFGYn6j21RYeqBzrQSyG5o4jV7mK2K6RVKj7bJazhq";
        const destination = "MINA";
        
        await usdcMock.mint(user, web3.utils.toBN("1000000"));

        await usdcMock.approve(bridge.address, "1000", { from: user });

        await bridge.deposit("1000", recipient, destination, { from: user });

        const bridgeBalance = await usdcMock.balanceOf(bridge.address);
        assert.equal(bridgeBalance.toString(), "1000", "The bridge should have 1000 USDC tokens");
    });

    it("should allow owner to complete a transfer", async () => {
        await bridge.completeTransfer(0, { from: owner });

        const transfer = await bridge.transfers(0);
        assert.equal(transfer.completed, true, "The transfer should be marked as completed");
    });

    it("should release USDC tokens to the recipient", async () => {
        await usdcMock.mint(bridge.address, web3.utils.toBN("1000000"));

        const transactionId = 1;
        await bridge.releaseTokens(user, "1000", transactionId, { from: owner });

        const userBalance = await usdcMock.balanceOf(user);
        assert.equal(userBalance.toString(), "1000", "The user should receive 1000 USDC tokens");
    });

    it("should not allow the same transaction to be processed twice", async () => {
        const transactionId = 1;
        try {
            await bridge.releaseTokens(user, "1000", transactionId, { from: owner });
            assert.fail("The same transaction should not be processed twice");
        } catch (error) {
            assert(error, "Expected an error but did not get one");
            assert(error.message.includes("Transaction already processed"), "Expected 'Transaction already processed' error");
        }
    });

    it("should allow users to withdraw their balances", async () => {
        await usdcMock.approve(bridge.address, "1000", { from: user });

        await bridge.deposit("1000", { from: user });

        await bridge.withdraw({ from: user });

        const userBalance = await usdcMock.balanceOf(user);
        assert.equal(userBalance.toString(), "1000", "The user should have withdrawn their 1000 USDC tokens");
    });

    it("should correctly report a user's balance on the contract", async () => {
        await usdcMock.approve(bridge.address, "100", { from: user });

        await bridge.deposit("100", { from: user });

        const balanceOnContract = await bridge.getBalanceOnContract({ from: user });

        assert.equal(balanceOnContract.toString(), "100", "The user's balance on the contract should be 100 USDC tokens");
    });

});
