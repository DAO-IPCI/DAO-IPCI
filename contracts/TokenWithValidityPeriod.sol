pragma solidity ^0.4.4;
import 'token/TokenEmissionACL.sol';
import 'acl/ACL.sol';

contract TokenWithValidityPeriod is TokenEmissionACL {
	
	uint public timestamp;
	uint public period;
	address public operator;
    
    modifier onlyPeriod { if (timestamp > 0 && timestamp <= now) throw; _; }
    modifier onlyOperator { if (msg.sender != operator) throw; _; }
	
	function TokenWithValidityPeriod(string _name, string _symbol, uint8 _decimals,
                              uint _start_count, address _acl_storage, 
							  string _emitent_group, address _operator)
             TokenEmissionACL(_name, _symbol, _decimals, _start_count, _acl_storage, 
			 				  _emitent_group)
    {
		operator = _operator;
	}
	
    /**
     * @dev Set Period
     * @param _value in seconds
     */
    function setPeriod(uint _value) onlyOperator {
        if (_value <= 0) throw;
        period = _value;
		if (timestamp > 0) {
			timestamp = now + period;
		}
    }
	
    /**
     * @dev Token emission
     * @param _value amount of token values to emit
     * @notice owner balance will be increased by `_value`
     */
    function emission(uint _value) onlyGroup(emitentGroup) onlyPeriod {
        if (timestamp == 0 && period > 0) {
			timestamp = now + period;
		}
        
        // Overflow check
        if (_value + totalSupply < totalSupply) throw;

        totalSupply          += _value;
        balances[msg.sender] += _value;
    }
    
    /**
     * @dev Transfer self tokens to given address
     * @param _to destination address
     * @param _value amount of token values to send
     * @notice `_value` tokens will be sended to `_to`
     * @return `true` when transfer done
     */
    function transfer(address _to, uint _value) onlyPeriod returns (bool) {
        if (balances[msg.sender] >= _value) {
            balances[msg.sender] -= _value;
            balances[_to]        += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    /**
     * @dev Transfer with approvement mechainsm
     * @param _from source address, `_value` tokens shold be approved for `sender`
     * @param _to destination address
     * @param _value amount of token values to send 
     * @notice from `_from` will be sended `_value` tokens to `_to`
     * @return `true` when transfer is done
     */
    function transferFrom(address _from, address _to, uint256 _value) onlyPeriod returns (bool) {
        var avail = allowances[_from][msg.sender]
                  > balances[_from] ? balances[_from]
                                    : allowances[_from][msg.sender];
        if (avail >= _value) {
            allowances[_from][msg.sender] -= _value;
            balances[_from] -= _value;
            balances[_to]   += _value;
            Transfer(_from, _to, _value);
            return true;
        }
        return false;
    }
  
    /**
     * @dev Burn the token values from sender balance and from total
     * @param _value amount of token values for burn 
     * @notice sender balance will be decreased by `_value`
     */
    function burn(uint _value) onlyPeriod {
        if (balances[msg.sender] >= _value) {
            balances[msg.sender] -= _value;
            totalSupply      -= _value;
        }
    }
}