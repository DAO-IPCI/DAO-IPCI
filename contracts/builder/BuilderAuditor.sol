pragma solidity ^0.4.4;
import 'creator/CreatorAuditor.sol';
import 'builder/Builder.sol';

/**
 * @title BuilderAuditor contract
 */
contract BuilderAuditor is Builder {
    /**
     * @dev Run script creation contract
     * @param _operator is an operator address
     * @param _token is an associated token address
     * @param _holder is a insurance holder address
     * @return address new contract
     */
    function create(address _operator, address _token,
                    address _holder, address _client) payable returns (address) {
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
 
        var inst = CreatorAuditor.create(_operator, _token, _holder);
        getContractsOf[_client].push(inst);
        Builded(_client, inst);
        inst.setOwner(_client);
        inst.setHammer(_client);
        return inst;
    }
}
