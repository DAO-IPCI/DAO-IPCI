pragma solidity ^0.4.4;

import 'common/Object.sol';

contract Billing is Object {
    ERC20   public token;
    address public taxman;
    address public beneficiary;
    mapping(address => int256) public balances;

    function Billing(address _token, address _taxman, address _beneficiary) {
        token = ERC20(_token);
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
        balances[_account] -= _fee;
    }

    /**
     * @dev Make a postpayment
     * @param _amount Amount of transfered tokens
     * @notice Token should be approved
     */
    function payment(uint256 _amount) {
        if (!token.transferFrom(msg.sender, beneficiary, _amount)) throw;
        balances[msg.sender] += _amount;
    }
}
