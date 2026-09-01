let title = "project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 8;
let rollback = 10;
let fullPrice = 101010;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов" + " " + screenPrice + " " + "рублей");
console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");
screens = screens.toLowerCase();
console.log(screens);
console.log(screens.split(", "));
console.log("Процент отката посреднику за работу" + " " + fullPrice * (rollback / 100));

document.getElementById("title-container").innerText = title;
document.getElementById("screens-container").innerText = screens;
document.getElementById("screenPrice-container").innerText = screenPrice;
document.getElementById("rollback-container").innerText = rollback;
document.getElementById("fullPrice-container").innerText = fullPrice;
document.getElementById("adaptive-container").innerText = adaptive;