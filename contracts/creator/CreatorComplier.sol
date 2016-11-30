pragma solidity ^0.4.4;
import 'contracts/Complier.sol';

library CreatorComplier {
    function create() returns (Complier)
    { return new Complier(); }

    function version() constant returns (string)
    { return "v0.4.9 (61521f3b)"; }

    function abi() constant returns (string)
    { return '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"burnedValueOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"delegate","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"type":"function"}]'; }
}
