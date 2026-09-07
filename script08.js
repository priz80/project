"use strict"

const appData = {
  title: " ",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  start: function () {
    appData.asking()
    appData.addPrices()
    appData.getFullPrice()
    appData.getServicePercentPrice()
    appData.getTitle()

    appData.logger()
  },
  isPureNumber: function (str) {
    return /^\d+$/.test(str);
  },
  validateString: function (str) {
    if (!str || str.trim() === "") return false;
    if (appData.isPureNumber(str.trim())) return false;
    return true;
  },
  validateNumber: function (str) {
    return !isNaN(parseFloat(str)) && isFinite(str) && str.trim() !== "";
  },
  asking: function () {
    let titleInput;
    do {
      titleInput = prompt("Как называется Ваш проект?", "Калькулятор верстки");
    } while (!appData.validateString(titleInput));

    appData.title = titleInput.trim();
    
    for (let i = 0; i < 2; i++) {
      let nameInput;
      do {
        nameInput = prompt(`Какие типы экранов нужно разработать? (Экран ${i + 1})`);
      } while (!appData.validateString(nameInput));

      let priceInput;
      let price = 0;
      do {
        priceInput = prompt(`Сколько будет стоить данная работа? (Экран ${i + 1})`);
      } while (!appData.validateNumber(priceInput));
      
      price = +priceInput;

      appData.screens.push({ id: i, name: nameInput, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let serviceNameInput;
      do {
        serviceNameInput = prompt(`Какой дополнительный тип услуги нужен? (Услуга ${i + 1})`);
      } while (!appData.validateString(serviceNameInput));

      let servicePriceInput;
      let servicePrice = 0;
      do {
        servicePriceInput = prompt(`Сколько это будет стоить? (Услуга ${i + 1})`);
      } while (!appData.validateNumber(servicePriceInput));
      
      servicePrice = +servicePriceInput;

      appData.services[serviceNameInput] = servicePrice;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },  
  addPrices: function() {
        for (let screen of appData.screens) {
      appData.screenPrice += +screen.price
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key]
    }
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices
  },
  getServicePercentPrice: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().slice(1).toLowerCase()
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%"
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%"
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена"
    } else {
      return "Что то пошло не так"
    }
  },
  logger: function () {
    console.log(appData.fullPrice); 
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
}

appData.start()