import 'creator/CreatorInsuranceHolder.sol';
import 'builder/Builder.sol';

/**
 * @title BuilderInsuranceHolder contract
 */
contract BuilderInsuranceHolder is Builder {
    /**
     * @dev Run script creation contract
     * @param _operator is an operator address
     * @param _token is an associated token address
     * @return address new contract
     */
    function create(address _operator, address _token) returns (address) {
        var inst = CreatorInsuranceHolder.create(_operator, _token);
        Owned(inst).delegate(msg.sender);
        deal(inst);
        return inst;
    }
}
