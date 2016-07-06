# DAO Carbon units ledger
For creating carbon units trading platform.  
Testnet founder address: `0x236EdcF07D0dF1C09E096719Eec3d7f53C8468F4`

## Workflow
**Auditor** send tx to `Token emission builder` for creating personal ledger for each **Issuer**, where he store all data about carbon units added on platform.
**Operator of the Program** approves Auditor via adding Auditor’s carbon ledger in DAO core ledger. After that **Issuer** can add a lot on DAO market.

## Initial modules
- `DAO core`
- `Shareholder token`
- `USD balance ledger`
- `DAO market`
- `Market regulator`
- `Market agent`
- `Market agent builder`
- `Token emission builder`
- `Board of Directors`
- `Voting token`

## Initial process

### Create DAO core

Parameter | Description | Data
---------|----------|-------
`_dao_name` | DAO name | Carbon units ledger
`_dao_description` | Short desc| DAO for creating carbon units trading platform
`_shares_name` | Shares name | DAO C.U.L. shares
`_shares_symbol` | Shares symbol | CUL
`_shares_count` | Initial founder shares balance | 10000

Aira BuilderDAO testnet address:

DAO Carbon units ledger core testnet adress: `0x97219C304cf8C32A15100BC26458890A9Ea5dade`
DAO C.U.L. shares testnet adress: `0xc27FDeCd130eF31397f63b03024CdDFf3d121b13`

Total cost: 0.1 Ether to DAO factory, 0.085 Ether to gas

### Add `Token emission builder` in DAO core ledger

**Issuer** ledger builder testnet address: `0x30c92e56E648E80F69F1fcB580d86aE7CA5A2D3A` [abi](https://github.com/airalab/core/blob/master/abi/builder/BuilderTokenEmission.json)

### Create test **Issuer** ledger

Interact with **Issuer** ledger builder. Use function `Create` with next parameters:

Parameter | Description | Data
---------|----------|-------
`_name` | Token name | Carbon units ledger
