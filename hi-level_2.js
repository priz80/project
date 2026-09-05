const arr = [
    "256",   
    "19",    
    "404",   
    "999",   
    "2000", 
    "123",   
    "42"    
];

arr.forEach(item => {
    if (/^2|^4/.test(item)) {
        console.log(item);
    }
});

function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log("Простые числа от 1 до 100:");
for (let i = 1; i <= 100; i++) {
    if (isPrime(i)) {
        console.log(`${i} — Делители этого числа: 1 и ${i}`);
    }
}