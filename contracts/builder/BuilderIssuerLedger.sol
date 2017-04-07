pragma solidity ^0.4.4;
import 'creator/CreatorTokenWithValidityPeriod.sol';
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
     * @param _operator_core is a operator DAO address
     * @param _group is a emitent group of created ledger
     * @return address new contract
     */
    function create(string _name, string _symbol, uint8 _decimals, address _operator_core, string _group, address _client) payable returns (address) {
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
 
        var dao = Core(_operator_core);
        var acl = dao.get("ACLStorage");
        var token = CreatorTokenWithValidityPeriod.create(_name, _symbol, _decimals, 0, acl, _group, dao.owner());
 
        var operator = dao.first();
        var holder = CreatorInsuranceHolder.create(operator, token);

        holder.setOwner(_client);
        holder.setHammer(_client);
        token.setOwner(_client);
        token.setHammer(_client);
        getContractsOf[_client].push(holder);
        Builded(_client, holder);
        return holder;
    }
}
