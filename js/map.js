/* eslint-disable valid-jsdoc */
'use strict';


var ENTER_KEYCODE = 13;


var adForm = document.querySelector('.ad-form');
var map = document.querySelector('.map');


// Добавляет атрибут disabled в форму
function adFormDisablet() {
  var child = adForm.querySelectorAll('fieldset');

  function addDisabledAtt(array) {
    array.forEach(function (element) {
      element.setAttribute('disabled', '');

    });
  }
  addDisabledAtt(child);
}

adFormDisablet();


// Находит элемент, в который мы будем вставлять похожие объявления
var similarListElement = map.querySelector('.map__pins');


var mapPinControl = similarListElement.querySelector('.map__pin--main');


// Алгоритм активации окна
var onPinControlClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var childFormList = adForm.querySelectorAll('fieldset');
  childFormList.forEach(function (element) {
    element.removeAttribute('disabled');
  });
};


// Обработчик активации окна
mapPinControl.addEventListener('click', function () {
  onPinControlClick();
  window.pin();
  window.card();
});


// Обработчик активации окна по нажатию на Enter
mapPinControl.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPinControlClick();
    window.pin();
    window.card();
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
