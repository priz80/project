"use strict";

const appData = {
  title: " ",
  screens: " ",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fillPrice: 0,
  servicePercentPrice: 0,
  service1: " ",
  service2: " ",
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fillPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePrcentPrice();
    appData.title = appData.getTitle();

    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    appData.title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать",
      "Простые, Сложные",
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      sum += +price;
    }

    return sum;
  },
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  getServicePrcentPrice: function () {
    return (
      appData.getFullPrice - appData.getFullPrice * (appData.rollback / 100)
    );
  },
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase()
    );
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  logger: function () {
    console.log(appData.getFullPrice);
    console.log(appData.servicePercentPrice);
  },
};

appData.start();
