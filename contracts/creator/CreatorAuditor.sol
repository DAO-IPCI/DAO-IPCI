import 'contracts/Auditor.sol';

library CreatorAuditor {
    function create(address _operator) returns (Auditor)
    { return new Auditor(_operator); }

    function version() constant returns (string)
    { return "v0.4.9 (61521f3b)"; }

    function interface() constant returns (string)
    { return '[{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"setToken","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"emissionValue","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"emission","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"delegate","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"emissionLimit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_limit","type":"uint256"}],"name":"setEmissionLimit","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_operator","type":"address"}],"type":"constructor"}]'; }
}
