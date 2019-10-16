'use strict';


(function () {
// Обработчик вывода сообщения о валидации
  var onSelectСhange = function () {
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


  // Callback переменная дезактивации страницы
  var successSubmitCallback = null;

  // Алгоритм вывода сообщения о валидации
  document.querySelector('#capacity').addEventListener('change', function () {
    onSelectСhange();
  });


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  // (Handler) Функция отправки данных на сервер
  function onFormAdSubmit(evt) {
    window.backend.send(new FormData(formAd), function () {
      successSubmitCallback();
    };
    evt.preventDefault();
  }

})();
