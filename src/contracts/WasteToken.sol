// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WasteToken is ERC20, Ownable {
    mapping(address => uint256) public wasteContributions;
    uint256 public constant TOKENS_PER_KG = 10 * 10**18; // 10 tokens per kg

    event WasteDeposited(address indexed user, uint256 amount, uint256 tokens);

    constructor() ERC20("WasteToken", "WST") Ownable(msg.sender) {}

    function depositWaste(uint256 wasteAmountKg) external {
        require(wasteAmountKg > 0, "Amount must be greater than 0");
        
        uint256 tokensToMint = wasteAmountKg * TOKENS_PER_KG;
        wasteContributions[msg.sender] += wasteAmountKg;
        
        _mint(msg.sender, tokensToMint);
        
        emit WasteDeposited(msg.sender, wasteAmountKg, tokensToMint);
    }

    function getWasteContribution(address user) external view returns (uint256) {
        return wasteContributions[user];
    }
}