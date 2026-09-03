"use strict";

let title = "project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 8000;
let rollback = 10;
let fullPrice = 20000;
let adaptive = true;

// console.log(screens.length);
// console.log("Стоимость верстки экранов" + " " + screenPrice + " " + "рублей");
// console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
// console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
// screens = screens.toLowerCase();

// console.log(
//   "Процент отката посреднику за работу" + " " + fullPrice * (rollback / 100),
// );

title = prompt("Как называется ваш проект?");
screens = prompt(
  "Какие типы экранов нужно разработать? (пример: Простые, Сложные, Интерактивные)",
);
// screenPrice = prompt("Сколько будет стоить данная работа?");
// adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");
let servicePercentPrice = 0;

function showTypeOf() {
  console.log(typeof title);
  console.log(typeof fullPrice);
  console.log(typeof adaptive);
}

const getAllServicePrices = function () {
  return +servicePrice1 + +servicePrice2;
};

let allServicePrices = getAllServicePrices();

function getServicePercentPrices() {
  rollback = fullPrice * (rollback / 100);
  servicePercentPrice = Math.ceil(fullPrice - rollback);
  return servicePercentPrice;
}

function getRollbackMessage() {
  if (fullPrice > 30000) {
    // servicePercentPrice = getServicePercentPrices();
    // servicePercentPrice -= servicePercentPrice / 10;
    console.log("Скидка 10%");
    // console.log("Итого:" + " " + servicePercentPrice + " " + "рублей");
  } else if (fullPrice > 15000 && fullPrice <= 30000) {
    // servicePercentPrice = getServicePercentPrices();
    // servicePercentPrice -= servicePercentPrice / 10;
    console.log("Скидка 5%");
    // console.log("Итого:" + " " + servicePercentPrice + " " + "рублей");
  } else if (fullPrice >= 0 && fullPrice <= 15000) {
    console.log("Скидка не предусмотрена");
  } else if (fullPrice < 0) {
    console.log("Что то пошло не так");
  }
}

function getFullPrice() {
  let fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;
  return fullPrice;
}

function getTitle() {
  title = title.trimStart();
  if (title.length === 0) return "";
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title;
}

// console.log("Проект:", getTitle());
showTypeOf();
console.log("Типы экранов:", screens);
getRollbackMessage();
console.log("стоимость за вычетом процента отката посреднику:", getServicePercentPrices());
