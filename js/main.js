'use strict';


var ENTER_KEYCODE = 13;
// Количество объявлений
var ADS_QUANTITY = 8;
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


// Добавляет атрибут disabled в форму
function abFormDisablet() {
  var abForm = document.querySelector('.ad-form');
  var child = abForm.querySelectorAll('fieldset');

  function addDisabledAtt(array) {
    array.forEach(function (element) {
      element.setAttribute('disabled', '');

    });
  }
  addDisabledAtt(child);
}

abFormDisablet();


// Переключаем карту из неактивного состояния в активное
var mapRegime = document.querySelector('.map');
// mapRegime.classList.remove('map--faded');


// Находит элемент, в который мы будем вставлять похожие объявления
var similarListElement = mapRegime.querySelector('.map__pins');


// Находит шаблон пинов, который мы будем копировать
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


// Находит шаблон карточки, который мы будем копировать
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


// eslint-disable-next-line valid-jsdoc
/**
*Выбирает случайное значение из массива
*
*@param {array} arr Массив с данными.
*
*@return возвращает случайное значение из массива.
*/
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


// eslint-disable-next-line valid-jsdoc
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


/**
 *Отрисовывает шаблон в документ
 *
 *@param {object} pin массив с данными объявлений.
 *
 *@return {object} возвращает объявление.
 */
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};


// Объект типов жилья
var offerTypeListMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};


/**
 *Отрисовывает шаблон в докумен
 *
 *@param {object} pin массив с данными объявлений.
 *
 *@return {object} featuresElement возвращает все доступные удобства в объявлении.
 */
var renderFeatures = function (featuresElement, pin) {
  var popupFeaturesContainer = featuresElement.querySelector('.popup__features');

  popupFeaturesContainer.innerHTML = '';
  pin.offer.features.forEach(function (item) {
    var element = document.createElement('li');
    element.classList.add('popup__feature', 'popup__feature--' + item);
    popupFeaturesContainer.appendChild(element);
  });

  return featuresElement;
};


/**
 *Отрисовывает шаблон в докумен
 *
 *@param {array} pin массив с данными.
 *
 *@return {object} photoElement возвращает фотографии.
 */
var renderPhoto = function (photoElement, pin) {
  photoElement.querySelector('.popup__photos').innerHTML = '';
  pin.offer.photos.forEach(function (item) {
    var element = document.createElement('img');
    element.classList.add('popup__photo');
    element.src = item;
    element.width = 45;
    element.height = 40;
    element.alt = 'Фотография квартиры';
    photoElement.querySelector('.popup__photos').appendChild(element);
  });

  return photoElement;
};


/**
 *Отрисовывает шаблон в документ
 *
 // eslint-disable-next-line valid-jsdoc
 *@param  {string} pin массив с данными карточки.
 *
 *@return {object} cardElement возвращает карточки.
 */
var renderCard = function (cardElement, pin) {
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypeListMap[pin.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
  return cardElement;
};


var pinsData = generationArray(ADS_QUANTITY);


var addItem = function (renderer, data) {
  return renderer(data);
};


// Добавляет элемент в шаблон
for (var i = 0; i < pinsData.length; i++) {
  similarListElement.appendChild(addItem(renderPin, pinsData[i]));

  var cardElement = similarCardTemplate.cloneNode(true);
  similarListElement.appendChild(renderCard(cardElement, pinsData[i]));
  similarListElement.appendChild(renderFeatures(cardElement, pinsData[i]));
  similarListElement.appendChild(renderPhoto(cardElement, pinsData[i]));
}


var mapPinControl = similarListElement.querySelector('.map__pin--main');


// Алгоритм активации окна
var onPinControlMousedown = function () {
  mapRegime.classList.remove('map--faded');
  var abForm = document.querySelector('.ad-form');
  abForm.classList.remove('ad-form--disabled');

  function abFormAblet() {
    var abFormS = document.querySelector('.ad-form');
    var childS = abFormS.querySelectorAll('fieldset');

    function removeDisabledAtt(array) {
      array.forEach(function (element) {
        element.removeAttribute('disabled');

      });
    }
    removeDisabledAtt(childS);
  }

  abFormAblet();
};


// Обработчик активации окна
mapPinControl.addEventListener('mousedown', function () {
  onPinControlMousedown();
});


// Обработчик активации окна по нажатию на Enter
mapPinControl.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPinControlMousedown();
  }
});


// Алгоритм почучения координат
var ordinataPin = function (paramX, paramY) {
  var testParam = document.querySelector('#address');
  testParam.setAttribute('value', paramX + ', ' + paramY);
};

mapPinControl.addEventListener('mousedown', function (evt) {
  ordinataPin(evt.pageX, evt.pageY);
});


// Обработчик вывода сообщения о валидации
var onSelectlСhange = function () {
  var capacityPattern = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var guestCapacity = capacitySelect.querySelector('option:checked');
  var roomCapacity = capacityPattern[roomSelect.querySelector('option:checked').value];
  var errorMessage = roomCapacity.includes(guestCapacity.value) ? '' : 'Колличество комнат не подходит ' + guestCapacity.textContent;
  capacitySelect.setCustomValidity(errorMessage);
};


// Алгоритм вывода сообщения о валидации
document.querySelector('#capacity').addEventListener('change', function () {
  onSelectlСhange();
});
