# Пример использования для Потребителя IPCI

## Начало работы

1. *Потребитель* создаёт аккаунт в сети Ethereum
2. *Потребитель* выбирает рынок [Market][1] и сохраняет адрес для дольнейшего использования 
3. *Потребитель* вызывает метод `create` контракта [BuilderComplier][2] из **DAO IPCI**
5. *Потребитель* вызывает метод `getLastContract` контракта [BuilderComplier][2]
6. Адрес контракта [Complier][3] сохраняется *Потребителем* для дальнейшего использования
7. *Потребитель* готов для работы с **DAO IPCI**

[1]: https://github.com/airalab/core/blob/master/sol/market/Market.sol
[2]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/builder/BuilderComplier.sol
[3]: https://github.com/airalab/DAO-IPCI/blob/master/contracts/Complier.sol

## Покупка токена IPCI

1. Используя методы `first` и `next` контракта [Market][1] *Потребитель* находит интересующий его лот
2. *Потребитель* вызывает метод `approve` на адрес лота 
3. *Потребитель* вызывает метод `deal` контракта [Lot][4] для заключения сделки
4. Токен IPCI переводится на адрес *Потребителя*

[4]: https://github.com/airalab/core/blob/master/sol/market/Lot.sol

## Сжигание токена IPCI

1. *Потребитель* выполняет `transfer` токенов на адрес контракта [Complier][3], **внимание:** переведенные токены никаким образом не могут быть выведены с контракта
2. *Потребитель* вызывает метод `burn` контракта [Complier][3], указывая:
  - Адрес целевого токена
  - Количество сжигаемых токенов
