// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReceiveUSDC {
    IERC20 public usdcToken;
    address usdcAddress;

    mapping(address => uint256) balances;

    event Received(address sender, uint256 amount);

    constructor(address _usdcAddress) {
        usdcAddress = _usdcAddress;
        usdcToken = IERC20(_usdcAddress);
    }

    function getBalance() public view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }

    function getBalanceOnContract() public view returns (uint256) {
        return balances[msg.sender];
    }

    function lockToken(
        uint128 id,
        uint256 amount,
        bytes32 recipient,
        bytes4 destination
    ) external {
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
        emit Received(msg.sender, amount);
    }
}