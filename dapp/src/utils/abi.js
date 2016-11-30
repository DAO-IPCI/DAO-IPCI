export default {
  BoardOfDirectors: [{ constant: true, inputs: [], name: 'shares', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'credits', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_count', type: 'uint256' }], name: 'pollDown', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_index', type: 'uint256' }], name: 'proposalDone', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'removeCoreModule', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_module', type: 'address' }, { name: '_interface', type: 'string' }, { name: '_constant', type: 'bool' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'setCoreModule', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_target', type: 'address' }, { name: '_value', type: 'uint256' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'fund', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_new_voting', type: 'address' }, { name: '_count', type: 'uint256' }], name: 'pollUp', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'minVotingShares', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'voting', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'dao_core', outputs: [{ name: '', type: 'address' }], type: 'function' }, { inputs: [{ name: '_dao_core', type: 'address' }, { name: '_shares', type: 'address' }, { name: '_credits', type: 'address' }], type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, name: 'new_token', type: 'address' }], name: 'VotingTokenChanged', type: 'event' }],
  CrowdSale: [{ constant: true, inputs: [], name: 'currentPeriod', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'end_time', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'endValue', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'is_alive', outputs: [{ name: '', type: 'bool' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'creditsOf', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'credits', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'is_fail', outputs: [{ name: '', type: 'bool' }], type: 'function' }, { constant: false, inputs: [], name: 'deal', outputs: [], type: 'function' }, { constant: false, inputs: [], name: 'refund', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'sale', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'start_time', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'priceStep', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'minValue', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'currentPrice', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'stepPeriod', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'target', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'checkTime', outputs: [], type: 'function' }, { inputs: [{ name: '_target', type: 'address' }, { name: '_credits', type: 'address' }, { name: '_sale', type: 'address' }, { name: '_start_time_sec', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }, { name: '_start_price', type: 'uint256' }, { name: '_step', type: 'uint256' }, { name: '_period_sec', type: 'uint256' }, { name: '_min_value', type: 'uint256' }, { name: '_end_value', type: 'uint256' }], type: 'constructor' }, { anonymous: false, inputs: [], name: 'Failed', type: 'event' }, { anonymous: false, inputs: [], name: 'Start', type: 'event' }, { anonymous: false, inputs: [], name: 'Finish', type: 'event' }],
  Ambix: [{ constant: false, inputs: [{ name: '_index', type: 'uint256' }, { name: '_source', type: 'address[]' }, { name: '_coef', type: 'uint256[]' }], name: 'setSource', outputs: [], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }, { name: '', type: 'uint256' }], name: 'rSource', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_sink', type: 'address[]' }, { name: '_coef', type: 'uint256[]' }], name: 'setSink', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'rSink', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'run', outputs: [], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }, { name: '', type: 'uint256' }], name: 'rSourceCoef', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'rSinkCoef', outputs: [{ name: '', type: 'uint256' }], type: 'function' }],
  BuilderAmbix: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'create', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  BuilderOperator: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_dao_name', type: 'string' }, { name: '_dao_description', type: 'string' }, { name: '_operator_name', type: 'string' }], name: 'create', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'dao_factory', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_core', type: 'address' }], name: 'setDaoFactory', outputs: [], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  BuilderIssuerLedger: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_operator_core', type: 'address' }, { name: '_group', type: 'string' }], name: 'create', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  BuilderAuditor: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_operator', type: 'address' }, { name: '_token', type: 'address' }, { name: '_holder', type: 'address' }], name: 'create', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  BuilderComplier: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [], name: 'create', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  InsuranceHolder: [{ constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], type: 'function' }, { constant: true, inputs: [{ name: '_index', type: 'uint256' }], name: 'record', outputs: [{ name: '', type: 'uint256' }, { name: '', type: 'uint256' }, { name: '', type: 'bool' }], type: 'function' }, { constant: false, inputs: [{ name: '_index', type: 'uint256' }], name: 'withdraw', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_duration_sec', type: 'uint256' }], name: 'setHoldDuration', outputs: [], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'operator', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'holdDuration', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'size', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ name: '', type: 'address' }], type: 'function' }, { inputs: [{ name: '_operator', type: 'address' }, { name: '_token', type: 'address' }], type: 'constructor' }],
  Auditor: [{ constant: true, inputs: [], name: 'insuranceHolder', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'transfer', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'holdPercentage', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'emissionValue', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'operator', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'emission', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'emissionLimit', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_limit', type: 'uint256' }], name: 'setEmissionLimit', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_hold', type: 'uint256' }], name: 'setHoldPercentage', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ name: '', type: 'address' }], type: 'function' }, { inputs: [{ name: '_operator', type: 'address' }, { name: '_token', type: 'address' }, { name: '_holder', type: 'address' }], type: 'constructor' }],
  Complier: [{ constant: false, inputs: [], name: 'kill', outputs: [], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'burnedValueOf', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_token', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'burn', outputs: [], type: 'function' }],
  BuilderACLStorage: [{ constant: false, inputs: [{ name: '_uri', type: 'string' }], name: 'setSecurityCheck', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'setBeneficiary', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'beneficiary', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'kill', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_buildingCostWei', type: 'uint256' }], name: 'setCost', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'buildingCostWei', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'getLastContract', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [], name: 'create', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }], name: 'getContractsOf', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'securityCheckURI', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'instance', type: 'address' }], name: 'Builded', type: 'event' }],
  ACLStorage: [{ constant: true, inputs: [{ name: '', type: 'uint256' }], name: 'group', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_group', type: 'string' }, { name: '_member', type: 'address' }], name: 'isMemberOf', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_group', type: 'string' }], name: 'memberFirst', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_group', type: 'string' }, { name: '_member', type: 'address' }], name: 'addMember', outputs: [], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'groupLength', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_group', type: 'string' }, { name: '_member', type: 'address' }], name: 'removeMember', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_firstMember', type: 'address' }], name: 'createGroup', outputs: [], payable: false, type: 'function' }, { constant: true, inputs: [{ name: '_group', type: 'string' }, { name: '_current', type: 'address' }], name: 'memberNext', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function' }]
}