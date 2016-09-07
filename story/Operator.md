# Пример использования для Оператора IPCI

## Начало работы

1. *Оператор* создаёт аккаунт в сети Ethereum и передаёт адрес куратору **DAO IPCI**
2. Куратор DAO IPCI вносит адрес в [operator address list][1]
3. *Оператор* создаёт ядро децентрализованной автономии (ДАО):
  1. *Оператор* вызывает метод `create` контракта [BuilderOperator][2], указывая:
    - Имя автономии
    - Описание автономии
    - Имя оператора
  2. В новое ядро сборщиком автоматически добавляются модули:
    - Адрес аккуанта *Оператора*
    - Хранилище [ACL][3]
    - Сборщик [BuilderIssuerLedger][4]
    - Сборщик [BuilderAuditor][5]
  3. *Оператор* вызывает метод `getLastContract` контракта [BuilderOperator][2]
  4. Адрес новой ДАО сохраняется *Оператором* и используется для дальнейшей работы в сети
4. *Оператор* готов для работы с **DAO IPCI**

[1]: https://github.com/airalab/DAO-IPCI/blob/master/OperatorList.md
[2]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderOperator.sol
[3]: https://github.com/airalab/core/blob/master/sol/acl/ACLStorage.sol
[4]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderIssuerLedger.sol
[5]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderAuditor.sol

## Добавление Аудитора

1. *Оператор* получает от *Аудитора* адрес контракта [Auditor][6]
2. *Оператор* добавляет адрес контракта *Аудитора* в группу [ACL][3]:
  - *Оператор* вызывает у контракта [ACL][3] своей ДАО метод:
    - `createGroup`, если группа *Аудитора* не существует
    - `addMember`, если *Аудитор* добавляется в существующую группу
  - с аргументами:
    - Имя группы
    - Адрес контракта *Аудитора*

[6]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/Auditor.sol

## Удаление Аудитора

1. *Оператор* вызывает метод `removeMember` у контракта [ACL][3] своей ДАО с аргументами:
  - Имя группы
  - Адрес контракта *Аудитора*

## Страховой случай

1. *Оператор* получает адрес контракта [InsuranceHolder][7] из поля `insuranceHolder` контракта [Auditor][6]
2. Вызывая метод `record` контракта [InsuranceHolder][7] с целочисленным аргументом, *Оператор* получает информацию о страховых взносах в формате:
  - Метка времени (UNIX time)
  - Величина взноса
  - Состояние взноса (`false`: взнос находится на балансе контракта, `true`: взнос был выведен)
3. *Оператор* вызывает метод `withdraw` контракта [InsuranceHolder][7] с целочисленным аргументом для перевода средств взноса на свой счет

[7]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/InsuranceHolder.sol

## Установка параметров

Контракт              | Метод               | Описание параметра
----------------------|---------------------|--------------------
[Auditor][6]          | `setEmissionLimit`  | Абсолютный предел количества токенов, эмиссируемых *Аудитором*
[Auditor][6]          | `setHoldPercentage` | Размер страхового взноса в процентах
[InsuranceHolder][7]  | `setHoldDuration`   | Время удержания страхового взноса в секундах, в течение этого времени вывод взноса доступен только *Оператору*
