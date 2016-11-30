pragma solidity ^0.4.4;
import 'token/Token.sol';
import './Operated.sol';

contract InsuranceHolder is Operated {
    // Operator address
    address public operator;

    // Issuer token address
    Token public token;

    // Hold duration
    uint public holdDuration;

    struct Record {
        uint timestamp;
        uint value;
        bool closed;
    }
    // List of values with timestamp
    Record[] values;

    /**
     * @dev Holder records length getter
     * @return values length
     */
    function size() constant returns (uint)
    { return values.length; }

    /**
     * @dev Holder records getter
     * @param _index is a record index
     * @return timestamp, value, closed
     */
    function record(uint _index) constant returns (uint, uint, bool) {
        var value = values[_index];
        return (value.timestamp, value.value, value.closed);
    }

    /**
     * @dev Holder constructor
     * @param _operator is an operator address
     * @param _token is an associated token address
     */
    function InsuranceHolder(address _operator, address _token) Operated(_operator) {
        // null check
        if (_operator == 0 || _token == 0) throw;

        operator = _operator;
        token = Token(_token);
    }

    /**
     * @dev Hold duration setter
     * @param _duration_sec is a hold duration in seconds
     */
    function setHoldDuration(uint _duration_sec) onlyOperator
    { holdDuration = _duration_sec; }

    /**
     * @dev Transfer approved value to this contract
     */
    function transfer(uint _value) returns (bool) {
        if (!token.transferFrom(msg.sender, this, _value)) throw;
        values.push(Record(now, _value, false));
        return true;
    }

    /**
     * @dev Withdraw can call only two persons: operator and issuer, operator can
     *      withdraw value immediately, but issuer should stay holdDuration time
     *      between receive and withdraw.
     * @param _index is a index of record for values
     */
    function withdraw(uint _index) {
        var rec = values[_index];

        // Check for closed record
        if (rec.closed) throw;

        // Operator case
        if (msg.sender == operator) {
            if (!token.transfer(operator, rec.value)) throw;
            rec.closed = true;
            return;
        }

        // Issuer case
        if (msg.sender == token.owner()) {
            if (rec.timestamp + holdDuration > now) throw;

            if (!token.transfer(token.owner(), rec.value)) throw;
            rec.closed = true;
            return;
        }

        // Throw for another sender
        throw;
    }
}
