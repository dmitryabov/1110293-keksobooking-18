'use strict';

(function () {
  window.upload = function (url, data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response) {
        window.formDisabled();
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

})();

  // Функция отправки запроса с данными формы на сервер
  function sendBackend(data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('POST', SEND_URL);
    // data - отправка данных формы на сервер
    xhr.send(data);
  }

