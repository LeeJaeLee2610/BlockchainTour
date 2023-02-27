// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    using SafeMath for uint256;
    constructor() ERC20("MyToken", "MTK") {}

    modifier checkLength(address[] calldata _to, uint256[] calldata _amount){
        require(_to.length > 0);
        require(_amount.length > 0);
        require(_to.length == _amount.length, "Do dai 2 cai ko bang nhau");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function getSumAmount(uint256[] calldata _amount) internal pure returns(uint256){
        uint256 sum;
        for(uint i = 0; i < _amount.length; i++){
            sum = sum.add(_amount[i]);
        }
        return sum;
    }

    function multiSendFixedToken(address[] calldata _to, uint256 _amount) public {
        require(_to.length > 0);
        require(_amount > 0);
        require(_to.length.mul(_amount) <= balanceOf(msg.sender));
        for(uint256 i = 0; i < _to.length; i++){
            transferFrom(msg.sender, _to[i], _amount);
        }
    }

    function multiSendDiffToken(address[] calldata _to, uint256[] calldata _amount) public checkLength(_to, _amount){
        require(getSumAmount(_amount) <= balanceOf(msg.sender));
        for(uint i = 0; i < _to.length; i++){
            require(_amount[i] > 0);
            transferFrom(msg.sender, _to[i], _amount[i]);
        }
    }

    function multiSendFixedTokenFromContract(address[] calldata _to, uint256 _amount) public onlyOwner {
        require(_to.length > 0);
        require(_amount > 0);
        require(_to.length.mul(_amount) <= balanceOf(address(this)));
        for(uint i = 0; i < _to.length; i++) {
            transferFrom(msg.sender, _to[i], _amount);
        }
    }

    function multiSendDiffTokenFromContract(address[] calldata _to, uint256[] calldata _amount) public onlyOwner checkLength(_to, _amount) {
        require(getSumAmount(_amount) <= balanceOf(address(this)));
        for(uint i = 0; i < _to.length; i++){
            require(_amount[i] > 0);
            transferFrom(msg.sender, _to[i], _amount[i]);
        }
        
    }
}
