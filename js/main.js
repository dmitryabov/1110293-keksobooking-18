'use strict';


// Количество объявлений
var ADS_QUANTITY = 8;
// Адрес изображения
var AUTHOR_AVATAR = ['01', '02', '03', '04', '05', '05', '05', '05'];
//  Заголовок предложения
var OFFER_TITLE = [
  'заголовок предложения1',
  'заголовок предложения2',
  'заголовок предложения3',
  'заголовок предложения4',
  'заголовок предложения5',
  'заголовок предложения6',
  'заголовок предложения7',
  'заголовок предложения8'
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
var OFFER_DESCRIPTION = ['строка с описанием1', 'строка с описанием2', 'строка с описанием3'];
// Фотографии
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// Метки на карте
var LOCATION_X = [100, 700, 300, 600, 500, 900];
var LOCATION_Y = [230, 300, 450, 500, 350, 330];


// Переключаем карту из неактивного состояния в активное
var mapRegime = document.querySelector('.map');
mapRegime.classList.remove('map--faded');


// Находит элемент, в который мы будем вставлять похожие объявления
var similarListElement = mapRegime.querySelector('.map__pins');
// Находит шаблон, который мы будем копировать
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


/**
 *Выбирает случайное значение из массива
 *
 *@param {array} arr Массив с данными.
 *
 *@return возвращает случайное значение из массива.
 */
var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};


// Массив случайно сгенерырованных объявлений
/**
 *Создает массив случайно сгенерированных объявлений.
 *
 *@param  {int} quantity колличество массивов.
 *
 *@return возвращает массивы.
 */
var generationArray = function (quantity) {
  var pins = [];
  for (var i = 0; i < quantity; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/' + 'user' + arrayRandElement(AUTHOR_AVATAR) + '.png'
      },
      offer: {
        title: arrayRandElement(OFFER_TITLE),
        address: arrayRandElement(OFFER_ADDRESS_X) + ',' + ' ' + arrayRandElement(OFFER_ADDRESS_Y),
        price: arrayRandElement(OFFER_PRICE),
        type: arrayRandElement(OFFER_TYPE),
        rooms: arrayRandElement(OFFER_ROOMS),
        guests: arrayRandElement(OFFER_GUESTS),
        checkin: arrayRandElement(OFFER_CHECKIN),
        checkout: arrayRandElement(OFFER_CHECKOUT),
        features: arrayRandElement(OFFER_FEATURES),
        description: arrayRandElement(OFFER_DESCRIPTION),
        photos: arrayRandElement(OFFER_PHOTOS)
      },
     location: {
       x: arrayRandElement(LOCATION_X),
       y: arrayRandElement(LOCATION_Y)
     }
  });
}
 return pins;
};


// Создаем массивы.
generationArray(ADS_QUANTITY);


/**
 *Отрисовывает шаблон в документ
 *
 *@param  {object} pin массив с данными объявлений.
 *
 *@return {object} возвращает объявление.
 */
var renderPin = function(pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};


/**
*Добавляет шаблон в документ
*
*@param  {array} array массив с данными.
*
*@return возвращает объявление.
*/
var addTemplate = function(array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderPin(array[j]));
  }
  return fragment;
};


similarListElement.appendChild(addTemplate(generationArray(ADS_QUANTITY)));

mapRegime.querySelector('.map__pins').classList.remove('map--faded');
