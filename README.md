# DAO Carbon units ledger
For creating carbon units trading platform.  
**Operator of the Program** testnet address: `0x236EdcF07D0dF1C09E096719Eec3d7f53C8468F4`
**DAO curator** testnet address: `0x6EFBA8fb2AC5b6730729a972eC224426a287C3Ad`

## Workflow

**Auditor** send transaction to `Issuer ledger builder` for creating personal carbon units ledger for each **Issuer**.
> only **Auditor** can issue new carbon units.

**Auditor** write **Issuer** account address in personal carbon units ledger. **Operator of the Program** approve new carbon ledger in DAO core ledger and approve **Issuer** address to access to DAO market. Only approved  **Issuer** and approved carbon units ledger tokens can trade on Market.

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

Aira BuilderDAO testnet address: `0xa76422591378d14fb6d94c9da48a42498d8b51da`
DAO Carbon units ledger core testnet adress: `0x97219C304cf8C32A15100BC26458890A9Ea5dade`
DAO C.U.L. shares testnet adress: `0xc27FDeCd130eF31397f63b03024CdDFf3d121b13`

Total cost: 0.1 Ether to DAO factory, 0.085 Ether to gas

### Add `Token emission builder` in DAO core ledger

**Issuer** ledger builder testnet address: `0x30c92e56E648E80F69F1fcB580d86aE7CA5A2D3A` [abi](https://github.com/airalab/core/blob/master/abi/builder/BuilderTokenEmission.json)

### Create test **Issuer** ledger

Interact with **Issuer** ledger builder. Use function `Create` with next parameters:
