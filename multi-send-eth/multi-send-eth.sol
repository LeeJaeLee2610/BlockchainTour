// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiSendETH{
    using SafeMath for uint256;

    mapping(address => uint256) public balances;

    function sendEth() public payable {
        balances[msg.sender] = balances[msg.sender].add(msg.value);
    }

    function getBalanceContract() public view returns(uint256){
        return address(this).balance;
    }

    function getBalanceAccount() public view returns(uint256){
        return balances[msg.sender];
    }

    function getSum(uint256[] calldata _amount) public view returns(uint256){
        uint256 sum;
        for(uint i = 0; i < _amount.length; i++){
            sum = sum.add(_amount[i]);
        }
        return sum;
    }

    function transferETH(address payable _to, uint256 _amount) public payable {
        require(balances[msg.sender] >= _amount, "Ko hop le");
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        _to.transfer(_amount);
    }

    function transferFixedETH(address payable[] calldata _to, uint256 _amount) public payable{
        require(_to.length * _amount < balances[msg.sender], "Ko hop le");
        for(uint i = 0; i < _to.length; i++){
            balances[msg.sender] = balances[msg.sender].sub(_amount);
            _to[i].transfer(_amount);
        }
    }

    function transferDiffETH(address payable[] calldata _to, uint256[] calldata _amount) public payable{
        require(_to.length > 0);
        require(_amount.length > 0);
        require(_to.length == _amount.length);
        require(getSum(_amount) < balances[msg.sender]);
        for(uint i = 0; i < _to.length; i++){
            balances[msg.sender] = balances[msg.sender].sub(_amount[i]);
            _to[i].transfer(_amount[i]);
        }
    }

    receive() external payable {}
    fallback() external payable {}
}