// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./EventToken.sol";

contract NFT is EventToken{
    using SafeMath for uint256;
    
    struct Card {
        uint256 tokenId;
        string image;
        string name;
        string eth;
        uint256 token;
    }

    mapping(address => uint256) private balances;
    mapping(uint256 => address) private cardByOwner;
    mapping(uint256 => Card) private cardById;
    mapping(address => Card[]) private balancesCard;
    Card[] private cards;

    function getBalancesAccount(address _account) public view returns(uint256) {
        return balances[_account];
    }

    function ownerOf(uint256 _tokenId) public view virtual returns (address) {
        return cardByOwner[_tokenId];
    }

    function getCardByTokenId(uint256 _tokenId) public view virtual returns(Card memory){
        return cardById[_tokenId];
    }

    function exists(uint256 tokenId) internal view virtual returns(bool) {
        return cardByOwner[tokenId] != address(0);
    }

    function getCards() public view returns(Card[] memory){
        return cards;
    }

    function getCardsByAddress(address _account) public view returns(Card[] memory){
        return balancesCard[_account];
    }

    function safeMintNFT(address _account, uint256 _tokenId, string calldata _image, string calldata _name, string calldata eth, uint256 _token) public {
        require(_account != address(0), "ERC721: mint to the zero address");
        require(!exists(_tokenId), "ERC721: token already minted");
        Card memory card = Card(_tokenId, _image, _name, eth,_token);
        balancesCard[_account].push(card);
        cards.push(card);
        unchecked{
            balances[_account] += 1; 
        }
        cardById[_tokenId] = card;
        cardByOwner[_tokenId] = _account;
    }

    function transferFromNFT(address _from, address _to, uint256 _tokenId) public {
        require(getCardByTokenId(_tokenId).tokenId != 0, "Card ko ton tai");
        for(uint256 i = 0; i < balancesCard[_from].length; i++){
            if(balancesCard[_from][i].tokenId == _tokenId){
                balancesCard[_to].push(balancesCard[_from][i]);
                delete balancesCard[_from][i];
                balances[_from] = balances[_from].sub(1);
                balances[_to] = balances[_to].add(1);
                cardByOwner[_tokenId] = _to;
            }
        }
        emit TransferEvent(_from, _to, _tokenId);
    }
}