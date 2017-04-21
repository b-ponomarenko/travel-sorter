import TransportTypes from "./transport-types";

export class TravelSorter {
  /**
   * Конструктор принимает на вход несортированные карточки,
   * а также инициализирует 2 массива - несортированные данные и сортированные данные, а также флаг "отсортированы ли данные".
   * @param data
   */
  constructor(data) {
    this.data = [];
    this.sortedData = [];
    this.isSorted = false;
    if (data && data instanceof Array) {
      this.data = data;
      this.count = data.length + 1;
    }
  }

  /**
   * Получает на вход набор поездок и добавляет их в массив data
   * @param trips
   */
  addTrips(trips) {
    this.data = [...this.data, ...trips];
    this.isSorted = false;
    this.count = this.data.length;
  }

  /**
   * Добавление одной поездки
   * @param trip
   */
  addTrip(trip) {
    this.data.push(trip);
    this.isSorted = false;
    this.count++;
  }

  /**
   * Нахождение первой поездки. Время работы O(n).
   * В первом обходе массива генерируется хэш-таблица destinationHashTable, в которой ключ является произведение широты и долготы пункта назначения,
   * а значение - наименование пункта назначения.
   * В следующем обходе массива на каждой итерации генерируется ключ из произведений широты и долгоды пункта отправления
   * и далее по этому ключу мы запрашиваем данные из хэш-таблицы.
   * Карточка, в котором будет находится пункт назначения будет та, в которой по ключу не найдется в хэш-таблице destinationHashTable
   * Когда наступает это событие цикл прерывается и возвращается этот элемент по индексу.
   * @returns {*}
   * @private
   */
  _getRootOrigin() {
    const destinationHashTable = {};

    this.data.forEach(trip => {
      destinationHashTable[this._getLocationHash(trip.destination.location)] = trip.destination.name;
    });

    for (let i = 0; i < this.data.length; i++) {
      const originLocation = this._getLocationHash(this.data[i].origin.location);

      if ( !destinationHashTable[originLocation] ) {
        return this.data[i];
      }
    }
  }

  /**
   * Сортировка карточек. Время работы O(n^2).
   * Это рекурсивная функция, которая на вход получает хэш из произведения предыдушей широты и долготы пункта назначения
   * и далее находит элемент в котором этот хэш, совпадает с произведением широты и долготы пункта отправления.
   * Таким образом мы создаем цепочку из карточек.
   * @param locationHash
   * @private
   */
  _findAndPushAllDestinations(locationHash) {
    const trip = this.data.find((trip) => this._getLocationHash(trip.origin.location) === locationHash);
    if (!trip) {
      return ;
    }
    this.sortedData.push(trip);
    this._findAndPushAllDestinations(this._getLocationHash(trip.destination.location));
  }

  /**
   * Публчиный метод, вызываемый пользователем.
   * Вызывает функцию по поиску первой карточки и далее вызывает функцию по сортировке всех карточек
   */
  sortTrips() {
    const root = this._getRootOrigin();

    this.sortedData.push(root);
    this._findAndPushAllDestinations(this._getLocationHash(root.destination.location));
    this.isSorted = true;
  }

  /**
   * Получение хэша из местоположения.
   * Уникальный ключ был выбран как произведение широты и долготы т.к. имя и другие данные могут быть не уникальными.
   * @param location
   * @returns {number}
   * @private
   */
  _getLocationHash(location) {
    return location.latitude * location.longitude;
  }

  /**
   * Возвращает отсортированные данные
   * @returns {Array}
   */
  getSortedTrips() {
    if ( !this.isSorted ) {
      throw new Error('Your trips has not already sorted! Call sortTrips method.')
    }

    return this.sortedData;
  }

  /**
   * Вставляет форматированные отсортированные карточки
   * @param elementPath
   */
  printTrips(elementPath) {
    const element = document.querySelector(elementPath);

    if (!element) {
      throw new Error(`element "${elementPath}" not found!`)
    }

    element.innerHTML = this._getFormatedText();
  }

  /**
   * Возвращает форматированный текст
   * @returns {string}
   * @private
   */
  _getFormatedText() {
    let result = '<ul>';

    if ( !this.isSorted ) {
      throw new Error('Your trips has not already sorted! Call sortTrips method.')
    }

    this.sortedData.forEach((trip) => {
      const transportType = TransportTypes.find((transportType) => transportType.id === trip.transport.type);

      if ( !transportType ) {
        result += `<li>From ${trip.origin.name} to ${trip.destination.name}</li>`;
      } else {
        result += `<li>${transportType.formatter(trip)}</li>`;
      }

    });

    result += '</ul>';

    return result;
  }
}
