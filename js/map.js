/* eslint-disable valid-jsdoc */
'use strict';


var ENTER_KEYCODE = 13;
// Количество объявлений
var ADS_QUANTITY = 8;


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


// Находит шаблон карточки, который мы будем копировать
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


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


var pinsData = window.data(ADS_QUANTITY);


var addItem = function (renderer, data) {
  return renderer(data);
};

var isPageActive = false;

// Добавляет элемент в шаблон
for (var i = 0; i < pinsData.length; i++) {
  similarListElement.appendChild(addItem(window.pin, pinsData[i]));

  var cardElement = similarCardTemplate.cloneNode(true);
  similarListElement.appendChild(renderCard(cardElement, pinsData[i]));
  similarListElement.appendChild(renderFeatures(cardElement, pinsData[i]));
  similarListElement.appendChild(renderPhoto(cardElement, pinsData[i]));
}


var mapPinControl = similarListElement.querySelector('.map__pin--main');


// Алгоритм активации окна
var onPinControlMousedown = function () {
  isPageActive = true;
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


