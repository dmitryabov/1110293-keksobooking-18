'use strict';


(function () {
  var ADS_QUANTITY = 8;
  // Объект типов жилья
  var offerTypeListMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };


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
  var generateRandomOffers = function (quantity) {
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


  window.data = {
    generateRandomOffers: generateRandomOffers,
    ADS_QUANTITY: ADS_QUANTITY,
    offerTypeListMap: offerTypeListMap
  };

})();
