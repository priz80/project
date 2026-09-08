/**
 * Функция для склонения слов "час", "часа", "часов" в зависимости от числа
 * @param {number} n - Число, для которого нужно определить форму слова
 * @returns {string} - Склоненная форма слова
 */
function getTimeWord(n) {
    let lastDigit = n % 10;
    let lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'часов';
    }

    if (lastDigit === 1) {
        return 'час';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'часа';
    }

    return 'часов';
}

/**
 * Функция для склонения слов "минута", "минуты", "минут" в зависимости от числа
 * @param {number} n - Число
 * @returns {string} - Склоненная форма слова
 */
function getMinuteWord(n) {
    let lastDigit = n % 10;
    let lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'минут';
    }

    if (lastDigit === 1) {
        return 'минута';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'минуты';
    }

    return 'минут';
}

/**
 * Функция для склонения слов "секунда", "секунды", "секунд" в зависимости от числа
 * @param {number} n - Число
 * @returns {string} - Склоненная форма слова
 */
function getSecondWord(n) {
    let lastDigit = n % 10;
    let lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'секунд';
    }

    if (lastDigit === 1) {
        return 'секунда';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'секунды';
    }

    return 'секунд';
}

/**
 * Получает название месяца
 * @param {number} monthIndex - Индекс месяца (0-11)
 * @returns {string} - Название месяца
 */
function getMonthName(monthIndex) {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return months[monthIndex];
}

/**
 * Получает название дня недели
 * @param {number} dayIndex - Индекс дня недели (0-6, где 0 - воскресенье)
 * @returns {string} - Название дня недели
 */
function getDayOfWeekName(dayIndex) {
    const days = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
        'Четверг', 'Пятница', 'Суббота'
    ];
    return days[dayIndex];
}

/**
 * Добавляет ведущий ноль, если число состоит из одной цифры
 * @param {number} num - Число
 * @returns {string} - Число в виде строки с ведущим нулем, если нужно
 */
function addLeadingZero(num) {
    return num < 10 ? '0' + num : num.toString();
}

/**
 * Функция обновления даты и времени на странице
 */
function updateDateTime() {
    const now = new Date();

    // --- Формат (a): 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды' ---
    const dayOfWeek = getDayOfWeekName(now.getDay());
    const day = now.getDate();
    const month = getMonthName(now.getMonth());
    const year = now.getFullYear();
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const timeWord = getTimeWord(hours);
    const minuteWord = getMinuteWord(minutes);
    const secondWord = getSecondWord(seconds);

    const formattedDateA = `Сегодня ${dayOfWeek}, ${day} ${month} ${year} года, ${hours} ${timeWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;

    // --- Формат (b): '04.02.2020 - 21:05:33' ---
    const dayStr = addLeadingZero(day);
    const monthStr = addLeadingZero(now.getMonth() + 1); // Месяцы в JS 0-11, поэтому +1
    const yearStr = year;
    
    const hoursStr = addLeadingZero(hours);
    const minutesStr = addLeadingZero(minutes);
    const secondsStr = addLeadingZero(seconds);

    const formattedDateB = `${dayStr}.${monthStr}.${yearStr} - ${hoursStr}:${minutesStr}:${secondsStr}`;

    // Вывод в DOM
    document.getElementById('date-format-a').textContent = formattedDateA;
    document.getElementById('date-format-b').textContent = formattedDateB;
}

// Запускаем функцию сразу, чтобы не ждать 1 секунду после загрузки страницы
updateDateTime();

// Обновляем каждую секунду
setInterval(updateDateTime, 1000);