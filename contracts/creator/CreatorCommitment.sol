pragma solidity ^0.4.4;
import 'contracts/Commitment.sol';

library CreatorCommitment {
    function create(address _operator, address _token, address _holder) returns (Commitment)
    { return new Commitment(_operator, _token, _holder); }

    function version() constant returns (string)
    { return "v0.4.9 (d641d8ab)"; }

    function abi() constant returns (string)
    { return '[{"constant":true,"inputs":[],"name":"insuranceHolder","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"hammer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"emission","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_percentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"emissionLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenEmission","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hammer","type":"address"}],"name":"setHammer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_operator","type":"address"},{"name":"_token","type":"address"},{"name":"_holder","type":"address"}],"type":"constructor"}]'; }
}
