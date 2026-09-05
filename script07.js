"use strict";

const appData = {

    randomNumber: 0,
    isPlaying: false,
    maxAttempts: 10,
    attemptsLeft: 0,

    logger: function () {
        console.log("--- Отладочная информация ---");
        console.log(`Загаданное число: ${this.randomNumber}`);
        console.log(`Попыток оставалось: ${this.maxAttempts}`);
        
        console.log("Содержимое объекта appData:");
        for (const key in this) {
            console.log(`${key}: ${this[key]}`);
        }
        console.log("---------------------------");
    },

    asking: function () {
        const userInput = prompt(`Угадай число от 1 до 100. У вас осталось попыток: ${this.attemptsLeft}`);

        if (userInput === null) {
            alert("Игра окончена. До свидания!");
            this.isPlaying = false;
            this.logger();
            return;
        }

        const userNumber = parseInt(userInput, 10);

        if (isNaN(userNumber) || userNumber.toString() !== userInput.trim()) {
            alert("Введи число!");
            this.asking();
            return;
        }

        if (userNumber < 1 || userNumber > 100) {
            alert("Число должно быть от 1 до 100!");
            this.asking();
            return;
        }

        this.attemptsLeft--;

        if (userNumber > this.randomNumber) {
            alert(`Загаданное число меньше, осталось попыток: ${this.attemptsLeft}`);
            this.checkGameContinuation();
        } else if (userNumber < this.randomNumber) {
            alert(`Загаданное число больше, осталось попыток: ${this.attemptsLeft}`);
            this.checkGameContinuation();
        } else {
            // Угадал
            alert("Поздравляю, Вы угадали!!!");
            this.handlePlayAgain("win");
        }
    },

    checkGameContinuation: function () {
        if (this.attemptsLeft <= 0) {
            this.handlePlayAgain("lose");
        } else {
            this.asking();
        }
    },

    handlePlayAgain: function (result) {
        let message = "";
        if (result === "win") {
            message = "Поздравляю, Вы угадали!!!";
        } else {
            message = "Попытки закончились!";
        }

        const playAgain = confirm(`${message} Хотите сыграть еще?`);
        
        if (playAgain) {
            this.start();
        } else {
            this.isPlaying = false;
            this.logger();
        }
    },

    start: function () {
        this.randomNumber = Math.floor(Math.random() * 100) + 1;
        this.attemptsLeft = this.maxAttempts;
        this.isPlaying = true;


        this.asking();
    }
};

appData.start();