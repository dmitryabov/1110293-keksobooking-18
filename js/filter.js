'use strict';

// Модуль управления фильтром
(function () {
  var MAX_DATA = 5;
  var ANY_TYPE = 'any';

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var formFilterElement = document.querySelector('.map__filters');
  var selectFilterElements = formFilterElement.querySelectorAll('select');
  var housingTypeElement = formFilterElement.querySelector('#housing-type');
  var housingRoomsElement = formFilterElement.querySelector('#housing-rooms');
  var housingGuestsElement = formFilterElement.querySelector('#housing-guests');
  var housingPriceElement = formFilterElement.querySelector('#housing-price');


  // Получение метода для удаления элементов
  var removeElement = null;
  var setRemoveMethod = function (removeMethod) {
    removeElement = removeMethod;
  };


  // Метод фильтрации элементов
  var dataFlag = false;
  var onFormFilterChange = null;

  window.getFilterData = function (data, insertMethod, doDebounce) {
    var initialData = data.slice();
    var filterData = initialData;

    if (!dataFlag) {
      insertMethod(initialData.slice(0, MAX_DATA));
      dataFlag = true;
    }

    onFormFilterChange = doDebounce(function () {
      filterData = initialData.filter(function (item) {
        return doFiltereType(item);
      });
      removeElement();
      insertMethod(filterData.slice(0, MAX_DATA));
    });

    formFilterElement.addEventListener('change', onFormFilterChange);
  };

  // Функция фильтрации по типу жилья
  var doFiltereType = function (element) {
    return housingTypeElement.value === ANY_TYPE || element['offer']['type'] === housingTypeElement.value;
  };

})();
