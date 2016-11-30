pragma solidity ^0.4.4;
import 'token/TokenEmission.sol';
import './InsuranceHolder.sol';
import './Operated.sol';

contract Auditor is Operated {
    // Operated token
    TokenEmission public token;

    // Emission current value
    uint public emissionValue;

    // Emission limit
    uint public emissionLimit;

    // Hold percent of emission
    uint public holdPercentage;
    
    // Address of insurance contract
    InsuranceHolder public insuranceHolder;

    /**
     * @dev Auditor contract constructor
     * @param _operator is an operator if this auditor
     * @param _token is an associated issuer token
     * @param _holder is an issurance holder address
     */
    function Auditor(address _operator,
                     address _token,
                     address _holder) Operated(_operator) {
        // null check
        if (_operator == 0 || _token == 0 || _holder == 0) throw;

        token = TokenEmission(_token);
        insuranceHolder = InsuranceHolder(_holder);
    }

    /**
     * @dev Auditor limit setter
     * @param _limit is a new limit value
     */
    function setEmissionLimit(uint _limit) onlyOperator
    { emissionLimit = _limit; }

    /**
     * @dev Auditor hold percentage setter
     * @param _hold is a new hold percent
     */
    function setHoldPercentage(uint _hold) onlyOperator {
        // Assertion for % value
        if (_hold > 100) throw;

        holdPercentage = _hold;
    }

    /**
     * @dev Auditor emission
     * @param _value is a emission value
     */
    function emission(uint _value) onlyOwner {
        // Overflow check
        if (emissionValue + _value < emissionValue) throw;

        emissionValue += _value;
        // Limit checking
        if (emissionValue > emissionLimit) throw;

        // Emission
        token.emission(_value);

        // Hold
        if (holdPercentage > 0) {
            var holdValue = _value * holdPercentage / 100;
            token.approve(insuranceHolder, holdValue);
            if (!insuranceHolder.transfer(holdValue)) throw;
        }
    }

    /**
     * @dev Transfer to issuer
     * @param _value is a transfer value
     */
    function transfer(uint _value) onlyOwner
    { if (!token.transfer(token.owner(), _value)) throw; }
}
