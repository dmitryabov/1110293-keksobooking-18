'use strict';


(function () {
  var map = document.querySelector('main');


  var similarErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


  var errorElement = similarErrorTemplate.cloneNode(true);
  errorElement.classList.add('visually-hidden');


  window.showErrorMessage = function () {
    map.appendChild(errorElement);
    errorElement.classList.remove('visually-hidden');
  };

})();
