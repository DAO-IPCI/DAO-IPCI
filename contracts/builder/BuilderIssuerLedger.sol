import 'creator/CreatorTokenEmissionACL.sol';
import 'creator/CreatorInsuranceHolder.sol';
import 'builder/Builder.sol';
import 'dao/Core.sol';

/**
 * @title BuilderIssuerLedger contract
 */
contract BuilderIssuerLedger is Builder {
    /**
     * @dev Run script creation contract
     * @param _name is a token name
     * @param _symbol is a token symbol
     * @param _decimals is count of numbers after point
     * @param _operator_core is a operator DAO address
     * @param _group is a emitent group of created ledger
     * @return address new contract
     */
    function create(string _name, string _symbol, uint8 _decimals,
                    address _operator_core, string _group) returns (address) {
        var dao = Core(_operator_core);
        var acl = dao.getModule("ACLStorage");
        var token = CreatorTokenEmissionACL.create(_name, _symbol, _decimals,
                                                   0, acl, _group);
 
        var operator = dao.firstModule();
        var holder = CreatorInsuranceHolder.create(operator, token);

        Owned(holder).delegate(msg.sender);
        Owned(token).delegate(msg.sender);
        deal(holder);
        return holder;
    }
}
