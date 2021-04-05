'use strict';
let n = 100;
let i = 0;
function isPrime(num) {
     if (num < 2) return false;
     for (let i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0) return false;
     }
     return true;
}
while (i < n) {
     if (isPrime(i)){
        console.log (i);
     }
     i++;
} 