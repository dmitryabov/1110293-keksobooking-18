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
  var renderFeatures = function (featuresElement, card) {
    var popupFeaturesContainer = featuresElement.querySelector('.popup__features');

    popupFeaturesContainer.innerHTML = '';
    card.offer.features.forEach(function (item) {
      var element = document.createElement('li');
      element.classList.add('popup__feature', 'popup__feature--' + item);
      popupFeaturesContainer.appendChild(element);
    });

    return featuresElement;
  };


  // Отрисовывает шаблон фотографий в докумен
  var renderPhoto = function (photoElement, card) {
    photoElement.querySelector('.popup__photos').innerHTML = '';
    card.offer.photos.forEach(function (item) {
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
  window.renderCard = function (cardElement, card) {
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    return cardElement;
  };


  window.removeCard = function () {
    similarListElement.removeChild(similarListElement.querySelector('article'));
  };


  var closeCard = similarCardTemplate.querySelector('.popup__close');


  closeCard.addEventListener('click', function () {
    window.removeCard();
  });


  // Добавляет карточку в шаблон
  window.addCardToTemplate = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    similarListElement.appendChild(window.renderCard(cardElement, card));
    similarListElement.appendChild(renderFeatures(cardElement, card));
    similarListElement.appendChild(renderPhoto(cardElement, card));
  };

})();
