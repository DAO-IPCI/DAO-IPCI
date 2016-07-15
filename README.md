# DAO «Issuance and transfer of Carbon Units»

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




### Shareholder token

DAO C.U.L. shares testnet adress: `0xc27FDeCd130eF31397f63b03024CdDFf3d121b13`


### Add `Token emission builder` in DAO core ledger

**Issuer** ledger builder testnet address: `0x30c92e56E648E80F69F1fcB580d86aE7CA5A2D3A` [abi](https://github.com/airalab/core/blob/master/abi/builder/BuilderTokenEmission.json)

### Create test **Issuer** ledger

Interact with **Issuer** ledger builder. Use function `Create` with next parameters:
