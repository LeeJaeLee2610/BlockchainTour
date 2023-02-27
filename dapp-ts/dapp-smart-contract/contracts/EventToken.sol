// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface EventToken {
    event TransferEvent(address indexed from, address indexed to, uint256 tokenId);
}