import 'common/Mortal.sol';

contract Operated is Mortal {
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
