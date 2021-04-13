'use strict';

let cart = {
    goods: [
         {  name: 'шампунь',
            id: 1238,
            price: 250,
            amount: 3,
        },
        {   name:'зубная паста', 
            id: 1242,
            price: 80,
            amount: 6,
        },
        {   name: 'мыло',
            id: 1678,
            price: 45,
            amount: 9,
        },
    ],
    cartCalc() {
        let totalPrice = 0;
        this.goods.forEach((cartItem) => {
            totalPrice += cartItem.price * cartItem.amount;
        });
        return totalPrice;
    }
}
console.log(cart.cartCalc());
