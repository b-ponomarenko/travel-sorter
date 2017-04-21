# Сортировщик карточек путешественника
Вам дана стопка посадочных карточек на различные виды транспорта, которые доставят
вас из точки A в точку B. Карточки перепутаны, и вы не знаете, где начинается и где
заканчивается ваше путешествие. Каждая карточка содержит информацию о том, откуда и
куда вы едете на данном отрезке маршрута, а также о типе транспорта (номер рейса,
номер места и прочее).

Предоставьте JavaScript API, который отсортирует такой список карточек и вернет
словесное описание, как проделать ваше путешествие. API должен принимать на вход
несортированный список карточек в формате придуманном вами и возвращать, например,
такое описание:

* Take train 78A from Madrid to Barcelona. Seat 45B.
* Take the airport bus from Barcelona to Gerona Airport. No seat assignment.
* From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.
* From Stockholm, take flight SK22 to New York JFK. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg.

### Требования:

* Алгоритм должен работать с любым количеством карточек, если все карточки образуют одну неразрывную цепочку.
* Время прибытия и отправления неизвестно и неважно. Подразумевается, что средство передвижения для следующего отрезка дожидается вас.
* Структура кода должна быть расширяема для использования любых типов транспорта и информации, которая может быть связана с каждым типом транспорта.
* API будет вызываться из других частей JavaScript-кода без необходимости дополнительных запросов между браузером и сервером.
* Не используйте библиотеки и фреймворки, напишите все с нуля.
* Задокументируйте в коде формат входных и выходных данных.

### Что нас интересует:
* Какой формат входных данных вы придумаете.
* Как вы структурируете свой код, чтобы он был расширяем, легок к пониманию и изменениям другими программистами.
* Какой алгоритм сортировки вы придумаете.

# Результат
## Установка
Добавьте ссылку на репозиторий в `package.json` в проекте:

```
{
   "dependencies": "https://github.com/b-ponomarenko/travel-sorter.git"
}
```
a затем импортируйте в необходимый файл:

```js
import TravelSorter from 'travel-sorter';
// или
const TravelSorter = require('travel-sorter');
```
## Использование
Для запуска кода нужно создать объект с помощью вызова констуктора:
```js
const cards = new TravelSorter(data); // data - передаваемые данные
cards.addTrips(someTrips); // Можем еще добавить карточек
cards.addTrip(trip); // Или одну карточку
cards.sortTrips(); // Сортируем
cards.getSortedTrips(); // Получаем массив отсортированных карточек
cards.printTrips('.some-selector'); // Или выводит форматированые данные в DOM в какой-то элемент
```

## Формат данных
В качестве формата данных была выбрана такая структура
```
[
  {
    "origin": {
      "name": string,
      "location": {
        "latitude": number,
        "longitude": number
      }
    },
    "destination": {
      "name": string,
      "location": {
        "latitude": number,
        "longitude": number
      }
    },
    "transport": {
      "type": number, // see src/transport-types.js
      "flight": string // only for planes,
      "gate": string // only for planes,
      "baggage": baggage // only for planes,
      "seat": number|string // for all, exlude taxi,
      "color": string // only for taxi,
      "brand": string // only for taxi,
      "number": number // only for trains,
      "wagon": number // only for trains,
    }
  }
]
```