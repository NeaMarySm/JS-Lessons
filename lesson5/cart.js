'use strict';

const goods = [
        {   product_name: 'шампунь',
            product_id: 1238,
            price: 250,
            quantity: 3,
        },
        {   product_name:'зубная паста', 
            product_id: 1242,
            price: 80,
            quantity: 6,
        },
        {   product_name: 'мыло',
            product_id: 1678,
            price: 45,
            quantity: 9,
        },
];

const cart = {
    cartContainer: null,
    goods,
    cartRender(){
        this.cartContainer = document.getElementById('cartContainer');
        if(this.goods.length){
            this.cartContainer.insertAdjacentHTML('beforeend', `В корзине ${this.quantityCalc()} товаров(а) на сумму ${this.priceCalc()} рублей`);
        }
        else {
            this.cartContainer.insertAdjacentHTML('beforeend', 'Корзина пуста');
        }
    },
    priceCalc(){
        return this.goods.reduce((price, good) => {
            return price + good.price * good.quantity;
        }, 0);
    },
    quantityCalc() {
        return this.goods.reduce((quantity, good) => {
            return quantity + good.quantity;
        }, 0);
    },
    
}

cart.cartRender();