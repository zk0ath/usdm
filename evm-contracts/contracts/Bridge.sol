// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bridge {
    address public owner;
    IERC20 public usdcToken;

    struct BridgeTransfer {
        address sender;
        uint256 amount;
        bytes32 recipient;
        bytes4 destination;
        bool completed;
    }

    mapping(uint256 => BridgeTransfer) public transfers;
    mapping(address => uint256) public balances;
    mapping(uint256 => bool) public processedTransactions;

    uint256 public nextTransferId;

    event Deposit(address indexed sender, uint256 amount, uint256 transferId);
    event TransferCompleted(uint256 transferId);
    event ReleaseTokens(
        address indexed recipient,
        uint256 amount,
        uint256 transactionId
    );
    event Withdrawal(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdcTokenAddress) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcTokenAddress);
    }

    function deposit(
        uint256 amount,
        bytes32 recipient,
        bytes4 destination
    ) public {
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        transfers[nextTransferId] = BridgeTransfer(
            msg.sender,
            amount,
            recipient,
            destination,
            false
        );
        balances[msg.sender] += amount;

        emit Deposit(msg.sender, amount, nextTransferId);
        nextTransferId++;
    }

    function completeTransfer(uint256 transferId) public onlyOwner {
        BridgeTransfer storage transfer = transfers[transferId];
        require(!transfer.completed, "Transfer already completed");
        transfer.completed = true;
        balances[transfer.sender] -= transfer.amount;

        emit TransferCompleted(transferId);
    }

    function releaseTokens(
        address recipient,
        uint256 amount,
        uint256 transactionId
    ) public onlyOwner {
        require(
            !processedTransactions[transactionId],
            "Transaction already processed"
        );
        processedTransactions[transactionId] = true;
        require(usdcToken.transfer(recipient, amount), "Transfer failed");
        emit ReleaseTokens(recipient, amount, transactionId);
    }

    function withdraw() public {
        uint256 userBalance = balances[msg.sender];
        require(userBalance > 0, "No balance to withdraw");

        balances[msg.sender] = 0;
        require(usdcToken.transfer(msg.sender, userBalance), "Transfer failed");

        emit Withdrawal(msg.sender, userBalance);
    }

    function getBalanceOnContract() public view returns (uint256) {
        return balances[msg.sender];
    }
}
