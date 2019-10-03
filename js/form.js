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
})();
