pragma solidity ^0.4.4;
import 'token/TokenEmission.sol';
import 'token/Token.sol';
import './InsuranceHolder.sol';
import './Operated.sol';

contract Commitment is Operated {
    // Operated token
    TokenEmission public tokenEmission;

    // Commitment percent
    uint public percentage;

    // Commitment token address
    Token public token;
    
    // Address of insurance contract
    InsuranceHolder public insuranceHolder;

    /**
     * @dev Commitment contract constructor
     * @param _operator is an operator if this Commitment
     * @param _token is an associated issuer token
     * @param _holder is an issurance holder address
     */
    function Commitment(address _operator,
                     address _token,
                     address _holder) Operated(_operator) {
        // null check
        if (_operator == 0 || _token == 0 || _holder == 0) throw;

        tokenEmission = TokenEmission(_token);
        insuranceHolder = InsuranceHolder(_holder);
        token = insuranceHolder.token();
    }

    /**
     * @dev Commitment percentage setter
     * @param _percentage is a new hold percent
     */
    function setPercentage(uint _percentage) onlyOperator {
        // Assertion for % value
        if (_percentage > 100) throw;

        percentage = _percentage;
    }

    /**
     * @dev Get balance
     * @return amount of tokens on balance
     */
    function balance() constant returns (uint256)
    { return token.balanceOf(this); }
    
    /**
     * @dev Get emission limit
     * @return amount of tokens
     */
    function emissionLimit() constant returns (uint256)
    {
        if (percentage == 0) return 0;
        uint256 b = balance() / (10 ** uint256(token.decimals()));
        uint256 limit = b * 100 / percentage;
        return limit * (10 ** uint256(tokenEmission.decimals()));
    }

    /**
     * @dev Commitment emission
     * @param _value is a emission value
     */
    function emission(uint _value) onlyOwner {
        uint limit = emissionLimit();
        
        // Limit checking
        if (_value > limit) throw;

        // Emission
        tokenEmission.emission(_value);

        // Hold
        var holdPercentage = _value * 100 / limit;
        var holdValue = balance() * holdPercentage / 100;
        token.approve(insuranceHolder, holdValue);
        if (!insuranceHolder.transfer(holdValue)) throw;
    }

    /**
     * @dev Transfer to issuer
     * @param _value is a transfer value
     */
    function transfer(uint _value) onlyOwner
    { if (!tokenEmission.transfer(tokenEmission.owner(), _value)) throw; }
}
