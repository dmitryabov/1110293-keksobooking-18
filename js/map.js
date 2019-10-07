'use strict';


(function () {
  var ENTER_KEYCODE = 13;


  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');


  // Добавляет атрибут disabled в форму
  function adFormDisabled() {
    var child = adForm.querySelectorAll('fieldset');

    function addDisabledAttribute(array) {
      array.forEach(function (element) {
        element.setAttribute('disabled', '');

      });
    }
    addDisabledAttribute(child);
  }

  adFormDisabled();


  var mapPinsContainer = map.querySelector('.map__pins');


  var mapPinControl = mapPinsContainer.querySelector('.map__pin--main');


  // Алгоритм активации окна
  var handlePinControlClick = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var childFormList = adForm.querySelectorAll('fieldset');
    childFormList.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };


  // Обработчик активации окна
  mapPinControl.addEventListener('click', function () {
    handlePinControlClick();
    window.pin();
    window.card();
  });


  // Обработчик активации окна по нажатию на Enter
  mapPinControl.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      handlePinControlClick();
      window.pin();
      window.card();
    }
  });


  var fillAddressField = function (paramX, paramY) {
    var addressField = document.querySelector('#address');
    addressField.setAttribute('value', paramX + ', ' + paramY);
  };


  mapPinControl.addEventListener('mousedown', function (evt) {
    fillAddressField(evt.pageX, evt.pageY);
  });
})();
