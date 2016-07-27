import 'creator/CreatorAuditor.sol';
import './BuilderBase.sol';

/**
 * @title BuilderAuditor contract
 */
contract BuilderAuditor is BuilderBase {
    /**
     * @dev Run script creation contract
     * @param _operator is Auditor operator address
     * @return address new contract
     */
    function create(address _operator) returns (address) {
        var inst = CreatorAuditor.create(_operator);
        Owned(inst).delegate(msg.sender);
        getContractsOf[msg.sender].push(inst);
        Builded(msg.sender, inst);
        return inst;
    }
}
