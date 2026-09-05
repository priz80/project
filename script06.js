"use strict";


function createGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    console.log(`[Для отладки] Загаданное число: ${randomNumber}`);

    function play() {
        const userInput = prompt("Угадай число от 1 до 100");

        if (userInput === null) {
            alert("Игра окончена");
            return;
        }

        const userNumber = parseInt(userInput, 10);

        if (isNaN(userNumber) || userNumber.toString() !== userInput.trim()) {
            alert("Введи число!");
            play();
            return;
        }

        if (userNumber < 1 || userNumber > 100) {
            alert("Число должно быть от 1 до 100!");
            play();
            return;
        }

        if (userNumber > randomNumber) {
            alert("Загаданное число меньше");
            play();
        } else if (userNumber < randomNumber) {
            alert("Загаданное число больше");
            play();
        } else {
            alert("Поздравляю, Вы угадали!!!");
        }
    }
    play();
}

createGame();