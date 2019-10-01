'use strict';


(function () {
// Находит шаблон пинов, который мы будем копировать
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  /**
 *Отрисовывает шаблон в документ
 *
 *@param {object} pin массив с данными объявлений.
 *
 *@return {object} возвращает объявление.
 */
  window.pin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };
})();
