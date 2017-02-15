pragma solidity ^0.4.0;
import 'common/Object.sol';

contract Docs is Object {

    struct Doc {
        string txId;
        string ipfs;
        address owner;
    }

    Doc[] public list;
    mapping(bytes32 => uint) indexes;
    uint public count = 0;

    function append(string txId, string ipfs) {
        uint index = indexes[sha3(txId)];
        if (index != 0) {
            if (list[index-1].owner != msg.sender)
                throw;
            list[index-1] = Doc(txId, ipfs, msg.sender);
        } else {
            list.push(Doc(txId, ipfs, msg.sender));
            indexes[sha3(txId)] = list.length;
            count++;
        }
    }

    function getIndex(string txId) constant returns (uint) {
        return indexes[sha3(txId)];
    }
}