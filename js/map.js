'use strict';


(function () {
  var ENTER_KEYCODE = 13;
  var Y_MIN = 150;
  var Y_MAX = 500;
  var X_MIN = 0;
  var X_MAX = 1150;


  var PinSizes = {
    WIDTH: 62,
    HEIGHT: 62,
    ARROW_HEIGHT: 18
  };


  var pinOffset = PinSizes.HEIGHT / 2 + PinSizes.ARROW_HEIGHT;


  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');


  var mapPinsContainer = map.querySelector('.map__pins');

  var mapPinControl = mapPinsContainer.querySelector('.map__pin--main');


  var pinCoords = {
    x: mapPinControl.offsetLeft,
    y: mapPinControl.offsetTop
  };


  // Алгоритм активации окна
  var handlePinControlClick = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var childFormList = adForm.querySelectorAll('fieldset');
    childFormList.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };


  // Алгоритм деактивации окна
  window.handlePinControDisabledClick = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };


  // Обработчик активации окна
  mapPinControl.addEventListener('click', function () {
    window.load('https://js.dump.academy/keksobooking/data',
        function (offers) {
          window.getFilterData(offers, window.addPinToTimplate, window.util.makeDebounce);
          handlePinControlClick();
        },
        window.showErrorMessage);
  });


  // Обработчик активации окна по нажатию на Enter
  mapPinControl.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.load('https://js.dump.academy/keksobooking/data',
          function (offers) {
            window.getFilterData(offers, window.addPinToTimplate, window.util.makeDebounce);
            handlePinControlClick();
          },
          window.showErrorMessage);
    }
  });


  var fillAddressField = function (paramX, paramY) {
    var addressField = document.querySelector('#address');
    addressField.setAttribute('value', paramX + ', ' + paramY);
  };


  mapPinControl.addEventListener('click', function (evt) {
    fillAddressField(evt.pageX, evt.pageY);
  });


  mapPinControl.addEventListener('click', function (evt) {
    fillAddressField(evt.pageX, evt.pageY);
  });


  // Событие начала перетаскивания окна
  mapPinControl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // Запомним координаты точки, с которой мы начали перемещать окно
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    pinCoords = {
      x: mapPinControl.offsetLeft,
      y: mapPinControl.offsetTop
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinCoords.x = mapPinControl.offsetLeft - shift.x;
      pinCoords.y = mapPinControl.offsetTop - shift.y;


      if ((pinCoords.y + pinOffset < Y_MIN) || (pinCoords.y + pinOffset > Y_MAX)) {
        pinCoords.y = mapPinControl.offsetTop;
      }
      if ((pinCoords.x < X_MIN) || (pinCoords.x > X_MAX)) {
        pinCoords.x = mapPinControl.offsetLeft;
      }


      mapPinControl.style.left = pinCoords.x + 'px';
      mapPinControl.style.top = pinCoords.y + 'px';
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          mapPinControl.removeEventListener('click', onClickPreventDefault);
        };
        mapPinControl.addEventListener('click', onClickPreventDefault);
        handlePinControlClick();
        window.load('https://js.dump.academy/keksobooking/data',
            function (offers) {
              window.getFilterData(offers, window.addPinToTimplate, window.util.makeDebounce);
              handlePinControlClick();

            },
            window.showErrorMessage);

      }

    };


    // Обработчик события передвижения мыши
    document.addEventListener('mousemove', onMouseMove);
    // Обработчик события отпускания кнопки мыши
    document.addEventListener('mouseup', onMouseUp);
  });

})();
