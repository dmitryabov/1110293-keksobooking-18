'use strict';


(function () {
  var ADS_QUANTITY = 8;
  var map = document.querySelector('.map');


  // Находит шаблон пинов, который мы будем копировать
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var addItem = function (renderer, data) {
    return renderer(data);
  };


  // Находит элемент, в который мы будем вставлять похожие объявления
  var similarListElement = map.querySelector('.map__pins');


  // Отрисовывает шаблон в документ
  var renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };


  var pinsData = window.data(ADS_QUANTITY);


  // Добавляет готовый шаблон в документ
  window.pin = function () {
    pinsData.forEach(function (pin) {
      similarListElement.appendChild(addItem(renderPin, pin));
    });
  };
})();
