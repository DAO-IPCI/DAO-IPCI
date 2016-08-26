# Инструкция для нового эмитента единиц
- Эмитент обращается к ядру DAO IPCI для получения адреса сборщика реестра IPMU 
- Эмитент обращается к сборщику реестра IPMU, указав адрес оператора программы

Operator of the Program create new Auditor Access Control List (ACL) for each Integrated Program Mitigation Units (IPMU) ledger.
Issuer send transaction to IPMU ledger builder with name of selected Auditor Access Control List. Only Auditor from Auditor Access Control List can issue new IPMU tokens.
Auditor send transaction to Auditor contract builder with client IPMU ledger address and Operator of the Program address.
Operator of the Program:
approve new carbon ledger in DAO core
approve Issuer address to access to DAO market.
Only approved Issuer and approved IPMU tokens can offering on Market.
