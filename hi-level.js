let lang = "ru";
const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
const daysEn = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

if (lang === "ru") {
  console.log("Дни недели на русском:", days);
} else if (lang === "en") {
  console.log("Дни недели на английском:", daysEn);
} else {
  console.log("Неизвестный язык");
}

let langs = "ru";

switch (langs) {
  case "ru":
    console.log("Дни недели на русском:", [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ]);
    break;
  case "en":
    console.log("Дни недели на английском:", [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
    break;
  default:
    console.log("Неизвестный язык");
}

let langd = "ru";

const daysByLang = {
  ru: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  en: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

const resultDays = daysByLang[langd] || ["Неизвестный язык"];
console.log("Дни недели:", resultDays);

let namePerson = "Артем"; // Попробуйте изменить значение

// Логика: если Артем, то директор, иначе (если Александр, то преподаватель, иначе студент)
let role =
  namePerson === "Артем"
    ? "директор"
    : namePerson === "Александр"
      ? "преподаватель"
      : "студент";

console.log(role);