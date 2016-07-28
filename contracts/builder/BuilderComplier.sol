import 'creator/CreatorComplier.sol';
import './BuilderBase.sol';

/**
 * @title BuilderComplier contract
 */
contract BuilderComplier is BuilderBase {
    /**
     * @dev Run script creation contract
     * @return address new contract
     */
    function create() returns (address) {
        var inst = CreatorComplier.create();
        Owned(inst).delegate(msg.sender);
        getContractsOf[msg.sender].push(inst);
        Builded(msg.sender, inst);
        return inst;
    }
}
