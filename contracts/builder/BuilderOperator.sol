pragma solidity ^0.4.4;
import 'builder/Builder.sol';
import 'creator/CreatorCore.sol';
import 'creator/CreatorACLStorage.sol';

/**
 * @title BuilderOperator contract
 */
contract BuilderOperator is Builder {
    /**
     * @dev Run script creation contract
     * @param _dao_name is an operator DAO name
     * @param _dao_description is an operator DAO description
     * @param _operator_name is an operator name
     * @return address new contract
     */
    function create(string _dao_name,
                    string _dao_description,
                    string _operator_name,
                    address _client) payable returns (address) {
        if (buildingCostWei > 0 && beneficiary != 0) {
            // Too low value
            if (msg.value < buildingCostWei) throw;
            // Beneficiary send
            if (!beneficiary.send(buildingCostWei)) throw;
            // Refund
            if (msg.value > buildingCostWei) {
                if (!msg.sender.send(msg.value - buildingCostWei)) throw;
            }
        } else {
            // Refund all
            if (msg.value > 0) {
                if (!msg.sender.send(msg.value)) throw;
            }
        }

        if (_client == 0)
            _client = msg.sender;
 
        var core = CreatorCore.create(_dao_name, _dao_description);
 
        // Operator address 
        core.set(_operator_name, _client, "", true);

        // ACL Storage
        var acl  = CreatorACLStorage.create();
        acl.setOwner(_client);
        acl.setHammer(_client);
        core.set("ACLStorage", acl,
            "https://github.com/airalab/core/blob/master/sol/acl/ACLStorage.sol", false);

        core.setOwner(_client);
        core.setHammer(_client);
        getContractsOf[_client].push(core);
        Builded(_client, core);
        return core;
    }
}
