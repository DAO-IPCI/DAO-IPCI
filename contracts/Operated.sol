import 'common/Owned.sol';

contract Operated is Owned {
    // Contract operator
    address public operator;

    /**
     * @dev Operated contract constructor
     * @param _operator is a operator address
     */
    function Operated(address _operator)
    { operator = _operator; }

    modifier onlyOperator { if (msg.sender != operator) throw; _ }
}
