pragma solidity ^0.4.4;
import 'common/Object.sol';

contract Operated is Object {
    // Contract operator
    address public operator;

    /**
     * @dev Operated contract constructor
     * @param _operator is a operator address
     */
    function Operated(address _operator)
    { operator = _operator; }

    modifier onlyOperator { if (msg.sender != operator) throw; _; }
}
