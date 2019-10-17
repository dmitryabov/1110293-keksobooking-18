'use strict';


(function () {
  var map = document.querySelector('.map');
  // Находит элемент, в который мы будем вставлять похожие объявления
  var similarListElement = map.querySelector('.map__pins');


  // Находит шаблон карточки, который мы будем копировать
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  // Отрисовывает шаблон features в докумен
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


  // Отрисовывает шаблон фотографий в докумен
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


  // Отрисовывает шаблон карточки в документ
  var renderCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = pin.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    return cardElement;
  };


  // Добавляет карточку в шаблон
  window.addCardToTimplate = function (pinsData) {
    pinsData.forEach(function (pin) {
      var cardElement = similarCardTemplate.cloneNode(true);
      similarListElement.appendChild(renderCard(cardElement, pin));
      similarListElement.appendChild(renderFeatures(cardElement, pin));
      similarListElement.appendChild(renderPhoto(cardElement, pin));
    });
  };
})();
