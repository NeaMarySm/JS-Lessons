'use strict'
let basket = [
    ['шампунь', 250, 3],
    ['зубная паста', 120, 5],
    ['мыло', 40, 15],
    ['крем', 400, 2],
];
function countBasketPrice(array){
    let totalPrice = 0;
    for(let i = 0; i < array.length; i++){
    totalPrice += array[i][1] * array[i][2];
    }
    return totalPrice;
}
console.log(countBasketPrice(basket));

let totalPrice = basket.reduce((totalPrice, basketItem) => totalPrice + basketItem[1] * basketItem[2], 0);
console.log(totalPrice);

let totalPrice2 = 0;
basket.forEach((basketItem) => {
   totalPrice2 += basketItem[1] * basketItem[2];
})
console.log(totalPrice2);