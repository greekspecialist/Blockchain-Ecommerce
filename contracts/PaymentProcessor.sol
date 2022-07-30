//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.15;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor{
    address public admin;
    IER20 public dai;

    event PaymentDone(
         address payer,
         uint amount, 
         uint paymentId,
         uint date
    );

    constructor(address adminAddress, address daiAddress) public{
        admin = adminAddress;
        dai = IER20(daiAddress);
    }
    function pay(uint amount, uint paymentID) external {
        dai.transferFrom(msg.sender, admin, amount);
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
        
    }
}