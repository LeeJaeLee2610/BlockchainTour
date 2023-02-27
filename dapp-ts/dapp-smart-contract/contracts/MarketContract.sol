// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./NFT.sol";

contract MarketContract is ERC20, NFT, Ownable{
    constructor() ERC20("MyToken", "MyT"){}

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _to, uint256 _amount) public onlyOwner{
        _burn(_to, _amount);
    }

    function buyToken(address _from, address _to, uint256 _token) public onlyOwner {
        transferFrom(_from, _to, _token);
    }

    function buyCardBuyToken(address _from, address _to, uint256 _tokenId, uint256 _token) public {
        transfer(_to, _token);
        transferFromNFT(_to, _from, _tokenId);
    }

    function buyCardBuyETH(address _from, address _to, uint256 _tokenId) public {
        transferFromNFT(_to, _from, _tokenId);
    }

    function addCard(address _account, uint256 _tokenId, string calldata _image, string calldata _name, string calldata eth, uint256 _token) public {
        safeMintNFT(_account, _tokenId, _image, _name, eth, _token);
    }
}