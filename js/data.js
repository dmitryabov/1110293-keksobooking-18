'use strict';


(function () {
  // Адрес изображения
  var AUTHOR_AVATAR = ['01', '02', '03', '04', '05', '05', '05', '05'];
  //  Заголовок предложения
  var OFFER_TITLE = [
    'Уютное гнездышко для молодоженов',
    'Уютная кваритира', 'Недалеко от центра',
    'Можно с животными', 'Рядом с парком',
    'Рядом с метро', 'Тут жил Пушкин',
    'Для жителей спб бесплатно'
  ];
  // Адрес предложения
  var OFFER_ADDRESS_X = ['600', '650', '625', '660', '640', '630', '610', '620'];
  var OFFER_ADDRESS_Y = ['300', '350', '325', '360', '340', '330', '310', '320'];
  // Cтоимость
  var OFFER_PRICE = [1100, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
  // Тип жилья
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  // Количество комнат
  var OFFER_ROOMS = [1, 2, 3, 4];
  // Количество гостей, которое можно разместить
  var OFFER_GUESTS = [1, 2, 3, 4];
  // Время заезда
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  // Время вызаезда
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  // Опции
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // Описание
  var OFFER_DESCRIPTION = [
    'Великолепная квартира-студия в центре Токио.',
    'Домик на окраине Токио. Подходит студентам. Квартира не дорогая.',
    'Квартира для семьи с детьми, рядом есть магазины, парк и много всего интересного.'
  ];
  // Фотографии
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  // Метки на карте
  var LOCATION_X = [100, 700, 300, 600, 500, 900];
  var LOCATION_Y = [230, 300, 450, 500, 350, 330];


  // Выбирает случайное значение из массива
  var getARandomElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };


  // Возвращает минимальное и максимально значение в диапазоне
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // Выбирает случайную длину массива
  var getRandomArray = function (arr) {
    var randomElement = getRandomInt(0, arr.length);
    return arr.slice(0, randomElement);
  };


  // Создает массив случайно сгенерированных объявлений.
  window.data = function (quantity) {
    var pins = [];
    for (var i = 0; i < quantity; i++) {
      pins.push({
        author: {
          avatar: 'img/avatars/' + 'user' + getARandomElement(AUTHOR_AVATAR) + '.png'
        },
        offer: {
          title: getARandomElement(OFFER_TITLE),
          address: getARandomElement(OFFER_ADDRESS_X) + ',' + ' ' + getARandomElement(OFFER_ADDRESS_Y),
          price: getARandomElement(OFFER_PRICE),
          type: getARandomElement(OFFER_TYPE),
          rooms: getARandomElement(OFFER_ROOMS),
          guests: getARandomElement(OFFER_GUESTS),
          checkin: getARandomElement(OFFER_CHECKIN),
          checkout: getARandomElement(OFFER_CHECKOUT),
          features: getRandomArray(OFFER_FEATURES),
          description: getARandomElement(OFFER_DESCRIPTION),
          photos: getRandomArray(OFFER_PHOTOS)
        },
        location: {
          x: getARandomElement(LOCATION_X),
          y: getARandomElement(LOCATION_Y)
        }
      });
    }
    return pins;
  };

})();
