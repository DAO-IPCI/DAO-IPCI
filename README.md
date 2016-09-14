# DAO «Integrated Program for Climate Initiatives»
> DAO IPCI work only on Ethereum testnet today.

- **Operator of the Program** testnet address: `0x236EdcF07D0dF1C09E096719Eec3d7f53C8468F4`
- **DAO curator** testnet address: `0x6EFBA8fb2AC5b6730729a972eC224426a287C3Ad`

## Workflow
1. **Operator of the Program** create new **Auditor** Access Control List (ACL) for each Integrated Program Mitigation Units (IPMU) ledger.
2. **Issuer** send transaction to `IPMU ledger builder` with name of selected **Auditor** Access Control List. Only **Auditor** from **Auditor** Access Control List can issue new IPMU tokens.
3. **Auditor** send transaction to `Auditor contract builder` with client IPMU ledger address and **Operator of the Program**  address.
4. **Operator of the Program**:
  - approve new carbon ledger in DAO core  
  - approve **Issuer** address to access to DAO market.
5. Only approved  **Issuer** and approved IPMU tokens can offering on Market.

## Initial modules
- `DAO core`
- `ACL storage`
- `Shareholder token`
- `Market agent builder`
- `Token Emission ACL builder`
- `Auditor contract builder`
- `Complier contract builder`
- `USD balance ledger`
- `DAO market`
- `Market regulator`
- `Market agent`

## Created modules on Testnet

#### DAO core «IPCI» :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/Core.json)
> 0x7ffC5d00F4F4ECA9Ce89644df75Ae4391D1f56e0

### BuilderOperator :: [abi](https://raw.githubusercontent.com/airalab/DAO-IPCI/master/abi/builder/BuilderOperator.json)
> 0x09bab4a302ebf66d209123ed520f72a836298ecf

### BuilderAuditor :: [abi](https://raw.githubusercontent.com/airalab/DAO-IPCI/master/abi/builder/BuilderAuditor.json)
> 0x5f7a1f56d0badd35c0d48589ec90e886b5f6ea0c 

### BuilderIssuerLedger :: [abi](https://raw.githubusercontent.com/airalab/DAO-IPCI/master/abi/builder/BuilderIssuerLedger.json)
> 0x0eab7640fe66e8481cd06b26467eab2c1a83275d 

#### IPCI shares :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmission.json)
> 0xB3EA0235C4592dc281D66e9ed11f3656a7E955eF

#### IPCI ACL Storage :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/ACLStorage.json)
> 0x952981d818e095368201ef6829736c35Ffb1a0fF

#### IPMU ledger builder :: [abi](https://raw.githubusercontent.com/airalab/core/develop/abi/builder/BuilderTokenEmissionACL.json)
> 0xC1dB09b0962e432c6bd042E05eC83557014A344D

#### Tihomovo IPMU ledger :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmissionACL.json)
> 0x0a2262444fD4387B281b5C6515DEbb26CA10eD9e

#### IPCI market USD balances :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/TokenEmission.json)
> 0xC6BA1097fD5c7Ef9Bde0444662451e81231C2EC2

#### IPCI market :: [abi](https://raw.githubusercontent.com/airalab/core/master/abi/modules/Market.json)
> 0x352eE84f70d8902fABF44Cf3f954019a72b7d588

#### Tihomovo ledger owner
> 0xE2be48F05F9D6Ee1CcF4ee7ccc4Ca0fB20F039C5
