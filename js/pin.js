'use strict';


(function () {
  var map = document.querySelector('.map');


  // Находит шаблон пинов, который мы будем копировать
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


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

  window.removeAllPins = function () {
    map.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });
  };

  // Добавляет готовый шаблон в документ
  window.addPinToTimplate = function (pinsData) {
    pinsData.forEach(function (pin) {
      var pinElement = renderPin(pin);

      similarListElement.appendChild(pinElement);

      pinElement.addEventListener('click', function () {
        window.addCardToTemplate(pin);
      });
    });
  };
})();
