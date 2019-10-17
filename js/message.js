'use strict';


(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('main');


  var similarErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


  var errorElement = similarErrorTemplate.cloneNode(true);
  errorElement.classList.add('visually-hidden');

  var closeErrorMessage = errorElement.querySelector('.error__button');


  // Обработчик закрытия окна
  closeErrorMessage.addEventListener('click', function () {
    errorElement.classList.add('visually-hidden');
  });


  // Обработчик закрытия окна по нажатию на ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorElement.classList.add('visually-hidden');
      successElement.classList.add('visually-hidden');
    }
  });


  window.showErrorMessage = function () {
    map.appendChild(errorElement);
    errorElement.classList.remove('visually-hidden');
  };


  var similarSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var successElement = similarSuccessTemplate.cloneNode(true);
  successElement.classList.add('visually-hidden');

  var closeSuccessMessage = successElement.querySelector('.success__message');

  // Обработчик закрытия окна
  closeSuccessMessage.addEventListener('click', function () {
    successElement.classList.add('visually-hidden');
  });


  window.showSuccessMessage = function () {
    map.appendChild(successElement);
    successElement.classList.remove('visually-hidden');
  };

})();
