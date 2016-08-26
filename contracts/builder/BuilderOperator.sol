import 'builder/Builder.sol';
import 'creator/CreatorCore.sol';
import 'creator/CreatorACLStorage.sol';

/**
 * @title BuilderOperator contract
 */
contract BuilderOperator is Builder {
    // DAO Factory address
    Core public dao_factory;

    function setDaoFactory(Core _core) onlyOwner
    { dao_factory = _core; }

    /**
     * @dev Run script creation contract
     * @param _dao_name is an operator DAO name
     * @param _dao_description is an operator DAO description
     * @param _operator_name is an operator name
     * @return address new contract
     */
    function create(string _dao_name,
                    string _dao_description,
                    string _operator_name) returns (address) {
        var core = CreatorCore.create(_dao_name, _dao_description);
 
        // Operator address 
        core.setModule(_operator_name, msg.sender, "", true);

        // ACL Storage
        var acl  = CreatorACLStorage.create();
        acl.delegate(msg.sender);
        core.setModule("ACLStorage", acl,
            "https://github.com/airalab/core/blob/master/sol/acl/ACLStorage.sol", false);

        // BuilderIssuerLedger
        core.setModule("BuilderIssuerLedger", dao_factory.getModule("BuilderIssuerLedger"),
            "https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderIssuerLedger.sol", false);

        // BuliderAuditor
        core.setModule("BuilderAuditor", dao_factory.getModule("BuilderAuditor"),
            "https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderAuditor.sol", false);

        Owned(core).delegate(msg.sender);
        deal(core);
        return core;
    }
}
