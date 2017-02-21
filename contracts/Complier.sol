pragma solidity ^0.4.4;
import 'common/Object.sol';
import 'token/TokenEmission.sol';

contract Complier is Object {
    // Total burned value
    mapping(address => uint) public burnedValueOf;

    /**
     * @dev Burn self balanced token values
     * @param _token is a token address
     * @param _value is a how amount token values need to burn
     */
    function burn(TokenEmission _token, uint _value) onlyOwner {
        var balance = _token.balanceOf(this);
        if (balance < _value) throw;

        _token.burn(_value);
        burnedValueOf[_token] += balance - _token.balanceOf(this);
    }
}
