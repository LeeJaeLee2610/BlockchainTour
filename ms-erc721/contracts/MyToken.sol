// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyToken is ERC721, Ownable {
    using SafeMath for uint256;
    constructor() ERC721("MyToken", "MTK") {}

    modifier checkLength(address[] calldata _to, uint256[] calldata _token){
        require(_to.length > 0);
        require(_token.length > 0);
        require(_to.length == _token.length, "Do dai 2 cai ko bang nhau");
        _;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function multiSendNFT(address[] calldata _to, uint256[] calldata _token) public checkLength(_to, _token){
        for(uint i = 0; i < _to.length; i++){
            safeTransferFrom(msg.sender, _to[i], _token[i]);
        }
    }
}
