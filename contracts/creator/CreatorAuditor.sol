pragma solidity ^0.4.4;
import 'contracts/Auditor.sol';

library CreatorAuditor {
    function create(address _operator, address _token, address _holder) returns (Auditor)
    { return new Auditor(_operator, _token, _holder); }

    function version() constant returns (string)
    { return "v0.4.9 (d641d8ab)"; }

    function abi() constant returns (string)
    { return '[{"constant":true,"inputs":[],"name":"insuranceHolder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"holdPercentage","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"emissionValue","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"emission","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"delegate","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"emissionLimit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_limit","type":"uint256"}],"name":"setEmissionLimit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_hold","type":"uint256"}],"name":"setHoldPercentage","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_operator","type":"address"},{"name":"_token","type":"address"},{"name":"_holder","type":"address"}],"type":"constructor"}]'; }
}
