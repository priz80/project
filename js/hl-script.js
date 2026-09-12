// ... existing code ...

const appData = {
  title: " ",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  fullPriceWithRollback: 0,
  totalCountAll: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isCalculated: false, // Флаг, был ли произведен расчет

  init: function () {
    appData.addTitle();
    appData.setupRangeSlider();
    
    calculateButton.addEventListener("click", appData.start);
    plusButton.addEventListener("click", appData.addScreenBlock);
    resetButton.addEventListener("click", appData.reset);
  },

  addTitle: function () {
    document.title = titleProject.textContent;
  },

  // Обновленный метод настройки слайдера
  setupRangeSlider: function () {
    inputTypeRange.addEventListener('input', function() {
      const val = this.value;
      rangeValueElement.textContent = val + '%';
      
      // 1. Если расчет еще не был произведен, просто обновляем значение в объекте, но не пересчитываем UI
      if (!appData.isCalculated) {
        appData.rollback = +val;
        return;
      }

      // 2. Если расчет уже был, пересчитываем только итоговую цену с откатом
      appData.rollback = +val;
      
      // Пересчет только полсуммы с откатом, чтобы не сбрасывать другие значения
      const currentFullPrice = appData.fullPrice;
      const rollbackPercent = appData.rollback;
      appData.fullPriceWithRollback = currentFullPrice - (currentFullPrice * (rollbackPercent / 100));
      
      // Обновляем отображение только поля с откатом
      totalCountRollback.value = appData.fullPriceWithRollback;
    });
  },

  start: function () {
    const hasValidScreen = Array.from(screens).some(screen => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      return select.value !== "" && input.value !== "";
    });

    if (!hasValidScreen) {
      alert("Пожалуйста, выберите тип экрана и укажите его количество хотя бы в одном блоке.");
      return;
    }

    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    // 1. Устанавливаем флаг, что расчет произведен
    appData.isCalculated = true;

    appData.showResult();
  },
  
  // Добавлен метод сброса состояния
  reset: function () {
    // Сбрасываем флаг расчета
    appData.isCalculated = false;
    
    // Сбрасываем значение отката на начальное
    appData.rollback = 10;
    inputTypeRange.value = 10;
    rangeValueElement.textContent = '10%';
    
    // Очищаем поля ввода
    totalCountRollback.value = 0;
    totalInputs.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCount.value = 0;
    
    // Очищаем данные
    appData.screens = [];
    appData.fullPrice = 0;
    appData.fullPriceWithRollback = 0;
    appData.totalCountAll = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
  },
  
  showResult: function () {
    totalInputs.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.fullPriceWithRollback;
    totalCount.value = appData.totalCountAll;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    appData.screens = [];
    appData.totalCountAll = 0;

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      
      if (select.value === "" || input.value === "") {
        return;
      }

      const selectName = select.options[select.selectedIndex].textContent;
      const count = +input.value;
      
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: count
      });
      
      appData.totalCountAll += count;
    });
  },

  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.fullPriceWithRollback = 0;

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.fullPriceWithRollback = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
};

appData.init();