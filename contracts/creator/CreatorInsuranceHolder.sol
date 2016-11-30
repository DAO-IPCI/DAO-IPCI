pragma solidity ^0.4.4;
import 'contracts/InsuranceHolder.sol';

library CreatorInsuranceHolder {
    function create(address _operator, address _token) returns (InsuranceHolder)
    { return new InsuranceHolder(_operator, _token); }

    function version() constant returns (string)
    { return "v0.4.9 (d641d8ab)"; }

    function abi() constant returns (string)
    { return '[{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"record","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_duration_sec","type":"uint256"}],"name":"setHoldDuration","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"holdDuration","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"delegate","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"transfer","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_operator","type":"address"},{"name":"_token","type":"address"}],"type":"constructor"}]'; }
}
