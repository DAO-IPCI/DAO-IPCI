pragma solidity ^0.4.4;
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
    function create(address _operator, address _token, address _client) payable returns (address) {
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
 
        var inst = CreatorInsuranceHolder.create(_operator, _token);
        getContractsOf[_client].push(inst);
        Builded(_client, inst);
        inst.setOwner(_client);
        inst.setHammer(_client);
        return inst;
    }
}
