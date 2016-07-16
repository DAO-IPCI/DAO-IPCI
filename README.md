# DAO «Integrated Program for Climate Initiatives»

- **Operator of the Program** testnet address: `0x236EdcF07D0dF1C09E096719Eec3d7f53C8468F4`
- **DAO curator** testnet address: `0x6EFBA8fb2AC5b6730729a972eC224426a287C3Ad`

## Workflow
1. **Operator of the Program** create new **Auditor** Access Control List (ACL) for each Integrated Program Mitigation Units (IPMU) ledger.
2. **Issuer** send transaction to `IPMU ledger builder` with name of selected **Auditor** Access Control List. Only **Auditor** from **Auditor** Access Control List can issue new IPMU tokens.
3. **Operator of the Program**:
  - approve new carbon ledger in DAO core  
  - approve **Issuer** address to access to DAO market.
4. Only approved  **Issuer** and approved IPMU tokens can offering on Market.

## Initial modules
- `DAO core`
- `ACL storage`
- `Shareholder token`
- `USD balance ledger`
- `DAO market`
- `Market regulator`
- `Market agent`
- `Market agent builder`
- `Token Emission ACL builder`
- `Board of Directors`
- `Voting token`

## Created modules

### DAO core
DAO core testnet adress: ``

Parameter | Description | Data
---------|----------|-------
`_dao_name` | DAO name | DAO «IPCI»
`_dao_description` | Short desc| Integrated Program for Climate Initiatives
`_shares_name` | Shares name | IPCI shares
`_shares_symbol` | Shares symbol | IPCI
`_shares_count` | Initial founder shares balance | 10000




#### DAO core «IPCI» :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/Core.json)
> 0x7ffC5d00F4F4ECA9Ce89644df75Ae4391D1f56e0

#### IPCI shares :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmission.json)
> 0xB3EA0235C4592dc281D66e9ed11f3656a7E955eF

#### IPCI ACL Storage :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/ACLStorage.json)
> 0x952981d818e095368201ef6829736c35Ffb1a0fF

#### IPMU ledger builder :: [abi](https://raw.githubusercontent.com/airalab/core/develop/abi/builder/BuilderTokenEmissionACL.json)
> 0xC1dB09b0962e432c6bd042E05eC83557014A344D

#### Tihomovo IPMU ledger :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmissionACL.json)
> 0x4A438561c2FA1A1801C283F7c3F69f0Db98E7192

#### Tihomovo IPMU ledger 2 :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmissionACL.json)
> 0x777051595451fe389970a734b0533c8e5d534e49



