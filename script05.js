"use strict";

let title;
let screens;
let screenPrice;
let adaptive;

let rollback = 10;
let fullPrice;
let allServicePrices;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num) && isFinite(num));
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать? (пример: Простые, Сложные, Интерактивные)",
    "Простые, Сложные",
  );

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  }
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let servicePrice1;
  let servicePrice2;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Отправка форм",
      );
      servicePrice1 = prompt("Сколько это будет стоить?");
      while (!isNumber(servicePrice1)) {
        servicePrice1 = prompt("Сколько это будет стоить?");
      }
    } else if (i === 1) {
      service2 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Продвижение",
      );
      servicePrice2 = prompt("Сколько это будет стоить?");
      while (!isNumber(servicePrice2)) {
        servicePrice2 = prompt("Сколько это будет стоить?");
      }
      return +servicePrice1 + +servicePrice2;
    }
  }
};
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getFullPrice = function () {
  return +screenPrice + allServicePrices;
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

const getRollbackMessage = (price) => {
  if (price >= 30000) {
    return "Скидка 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Скидка 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

const getTitle = () => {
  title = title.trimStart();
  if (title.length === 0) return "";
  return title.charAt(0).toUpperCase() + title.slice(1);
  // return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase()
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log("Типы экранов:", screens.length);

console.log(
  "стоимость за вычетом процента отката посреднику:",
  getServicePercentPrices(),
);

console.log("Стоимость верстки экранов " + screenPrice + " руб");
console.log("Стоимость разработки сайта " + fullPrice + " руб");
