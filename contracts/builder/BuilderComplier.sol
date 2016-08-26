import 'creator/CreatorComplier.sol';
import 'builder/Builder.sol';

/**
 * @title BuilderComplier contract
 */
contract BuilderComplier is Builder {
    /**
     * @dev Run script creation contract
     * @return address new contract
     */
    function create() returns (address) {
        var inst = CreatorComplier.create();
        Owned(inst).delegate(msg.sender);
        deal(inst);
        return inst;
    }
}
