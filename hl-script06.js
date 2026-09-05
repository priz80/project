"use strict";

function createGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 10;
    
    console.log(`[Для отладки] Загаданное число: ${randomNumber}`);

    function play(attemptsLeft) {
        const userInput = prompt(`Угадай число от 1 до 100. У вас осталось попыток: ${attemptsLeft}`);

        if (userInput === null) {
            alert("Игра окончена. До свидания!");
            return;
        }

        const userNumber = parseInt(userInput, 10);

        if (isNaN(userNumber) || userNumber.toString() !== userInput.trim()) {
            alert("Введи число!");
            play(attemptsLeft);
            return;
        }

        if (userNumber < 1 || userNumber > 100) {
            alert("Число должно быть от 1 до 100!");
            play(attemptsLeft);
            return;
        }

        if (userNumber > randomNumber) {
            alert(`Загаданное число меньше, осталось попыток: ${attemptsLeft - 1}`);
            if (attemptsLeft - 1 <= 0) {
                 handleGameOver(false);
            } else {
                play(attemptsLeft - 1);
            }
        } else if (userNumber < randomNumber) {
            alert(`Загаданное число больше, осталось попыток: ${attemptsLeft - 1}`);
            if (attemptsLeft - 1 <= 0) {
                 handleGameOver(false);
            } else {
                play(attemptsLeft - 1);
            }
        } else {
            handleWin();
        }
    }

    function handleWin() {
        const playAgain = confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?");
        if (playAgain) {
            createGame();
        }
    }

    function handleGameOver(isWin) {
        const message = "Попытки закончились!";
        const playAgain = confirm(`${message} Хотите сыграть еще?`);
        if (playAgain) {
            createGame();
        }
    }
    play(maxAttempts);
}

createGame();