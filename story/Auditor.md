# Пример использования для Аудитора IPCI

## Начало работы

1. *Аудитор* создаёт аккаунт в сети Ethereum
2. *Аудитор* выбирает *Оператора* из списка [operator address list][1] 
3. *Аудитор* получает из ДАО *Оператора* получает:
  - Адрес аккаунта *Оператора*
  - Адрес контракта [BuilderAuditor][2]
4. *Аудитор* готов для работы с **DAO IPCI**

[1]: https://github.com/airalab/DAO-IPCI/blob/master/OperatorList.md
[2]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderAuditor.sol

## Добавление Эмитента

1. *Аудитор* вызывает метод `create` контракта [BuilderAuditor][2], указывая:
  - Адрес аккаунта оператора
  - Адрес контракта аудируемого токена ([TokenEmissionACL][3])
  - Адрес контракта [InsuranceHolder][4]
2. *Аудитор* вызывает метод `getLastContract` контракта [BuilderAuditor][2]
3. Полученный на предыдущем шаге адрес контракта *Аудитор* сообщает *Оператору*
4. Адрес контракта [Auditor][5] сохраняется *Аудитором* и используется для дальнейшей работы в сети

[3]: https://github.com/airalab/core/blob/master/sol/token/TokenEmissionACL.sol
[4]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/InsuranceHolder.sol
[5]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/Auditor.sol

## Эмиссия

1. *Аудитор* вызывает метод `emission` контракта [Auditor][5] с аргументом:
  - Количество эмиссируемых токенов
2. Контрактом эмиссируется указанное количество токенов, если не превышается `emissionLimit`
3. Контракт автоматически переводит `holdPercentage` % от эмиссируемой суммы на счет [InsuranceHolder][4]
4. *Аудитор* вызывает метод `transfer` контракта [Auditor][5] с аргументом:
  - Количество переводимых токенов
5. Контракт переводит средства автору аудируемого токена
