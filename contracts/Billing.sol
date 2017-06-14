pragma solidity ^0.4.4;

import 'common/Object.sol';

contract Billing is Object {
    address public taxman;
    address public beneficiary;
    mapping(address => int256) public balances;

    function Billing(address _taxman, address _beneficiary) {
        taxman = _taxman;
        beneficiary = _beneficiary;
    }

    /**
     * @dev Take a fee from account in postpayment scheme
     * @param _account Client account
     * @param _fee Payment value
     */
    function serviceFee(address _account, uint256 _fee) { 
        if (msg.sender != taxman) throw;
        balances[_account] -= int256(_fee);
    }

    /**
     * @dev Make a postpayment
     */
    function payment() payable {
        if (!beneficiary.send(msg.value)) throw;
        balances[msg.sender] += int256(msg.value);
    }
}
