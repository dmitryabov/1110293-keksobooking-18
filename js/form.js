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


  // Алгоритм вывода сообщения о валидации
  document.querySelector('#capacity').addEventListener('change', function () {
    onSelectСhange();
  });


  var adForm = document.querySelector('.ad-form');


  // Добавляет атрибут disabled в форму
  window.formDisabled = function adFormDisabled() {
    var child = adForm.querySelectorAll('fieldset');

    function addDisabledAttribute(array) {
      array.forEach(function (element) {
        element.setAttribute('disabled', '');

      });
    }
    addDisabledAttribute(child);
  };


  window.formDisabled();

  var onSuccess = function () {
    window.formDisabled();
    window.handlePinControDisabledClick();
    window.removeCard();
    window.removeAllPins();
    window.showSuccessMessage();
  };


  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.upload('https://js.dump.academy/keksobooking', new FormData(form), onSuccess, window.showErrorMessage);
    evt.preventDefault();
  });
})();
