'use strict'

let title = "project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 8;
let rollback = 10;
let fullPrice = 101010;
let adaptive = true;

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);
// console.log(screens.length);
// console.log("Стоимость верстки экранов" + " " + screenPrice + " " + "рублей");
// console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
// console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
// screens = screens.toLowerCase();
// console.log(screens);
// console.log(screens.split(", "));
// console.log("Процент отката посреднику за работу" + " " + fullPrice * (rollback / 100));

title = prompt("Как называется ваш проект?");
screens = prompt("Какие типы экранов нужно разработать? (пример: Простые, Сложные, Интерактивные)");
screenPrice = prompt("Сколько будет стоить данная работа?");
adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");

fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - (fullPrice / 10));

if (fullPrice > 30000) {
    servicePercentPrice -= servicePercentPrice/10; 
} else if (fullPrice > 15000 && fullPrice <= 30000 ){
    servicePercentPrice -= servicePercentPrice/20; 
} else if (fullPrice >= 0 && fullPrice <= 15000 ){
    console.log("Скидка не предусмотрена");
} else if (fullPrice < 0 ){
    console.log("Что то пошло не так");
}

console.log("Итого:" + " " + servicePercentPrice + " " + "рублей");
alert("Итого:" + " " + servicePercentPrice + " " + "рублей");