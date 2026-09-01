let num = 266219;
let strNum = num.toString();
let product = 1;

for (let i = 0; i < strNum.length; i++) {
    product *= Number(strNum[i]);
}

console.log("Произведение цифр числа " + num + " равно: " + product);

let result = product ** 3;

console.log("Результат возведения в степень 3: " + result);

let firstTwoDigits = result.toString().slice(0, 2);

console.log("Первые 2 цифры результата: " + firstTwoDigits);