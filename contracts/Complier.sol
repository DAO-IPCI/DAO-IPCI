import 'common/Owned.sol';
import 'token/TokenEmission.sol';

contract Complier is Owned {
    // Total burned value
    mapping(address => uint) public burnedValueOf;

    /**
     * @dev Burn self balanced token values
     * @param _token is a token address
     * @param _value is a how amount token values need to burn
     */
    function burn(TokenEmission _token, uint _value) onlyOwner {
        if (_token.getBalance() < _value) throw;

        _token.burn(_value);
        burnedValueOf[_token] += _value;
    }
}
