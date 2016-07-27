import 'token/TokenEmission.sol';
import './Operated.sol';

contract Auditor is Operated {
    // Operated token
    TokenEmission public token;

    // Emission current value
    uint public emissionValue;

    // Emission limit
    uint public emissionLimit;
    
    /**
     * @dev Auditor contract constructor
     * @param _operator is an operator if this auditor
     */
    function Auditor(address _operator) Operated(_operator) {}

    /**
     * @dev Auditor token setter
     * @param _token is a new auditor token
     */
    function setToken(TokenEmission _token) onlyOperator
    { token = _token; }

    /**
     * @dev Auditor limit setter
     * @param _limit is a new limit value
     */
    function setEmissionLimit(uint _limit) onlyOperator
    { emissionLimit = _limit; }

    /**
     * @dev Auditor emission
     * @param _value is a emission value
     */
    function emission(uint _value) onlyOwner {
        // Limit checking
        if (emissionValue + _value > emissionLimit) throw;

        // Emission
        emissionValue += _value;
        token.emission(_value);

        // Transfer
        if (!token.transfer(token.owner(), _value)) throw;
    }
}
