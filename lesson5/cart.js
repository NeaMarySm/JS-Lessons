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
const catalog = {
    catalogContainer: null,
    goods,
    generateProductList(){
            this.catalogContainer = document.getElementById('catalog');
            this.catalogContainer.insertAdjacentHTML('afterbegin', '<h2>Каталог товаров</h2>');
            let productList = '';
            this.goods.forEach((good) => {
                productList += 
                `<div class="catalog-item">
                    <div id="${good.product_id}">Товар: ${good.product_name}</div>
                    <div class = "product-price">Цена за единицу: ${good.price} руб.</div>
                    <button class="cart-add btn">Добавить в корзину</button>
                </div>`
            });
            this.catalogContainer.innerHTML += productList;
    }
}
catalog.generateProductList();



const cart = {
    cartContainer: null,
    goods,
    cartRender(){
        this.cartContainer = document.getElementById('cartContainer');
        this.cartContainer.insertAdjacentHTML('afterbegin', '<h2>Корзина</h2>');
        if(this.goods.length){
            let cartList = '';
            this.goods.forEach((good) => {
                cartList += 
                `<div class="catalog-item">
                    <div id="cart_${good.product_id}">Товар: ${good.product_name} ${good.quantity}шт Стоимость: ${good.price * good.quantity} руб.</div>
                    <button class="cart-del btn">Удалить из корзины</button>
                </div>`
            });
            this.cartContainer.innerHTML += cartList;
            this.cartContainer.insertAdjacentHTML('beforeend', `В корзине ${this.quantityCalc()} товаров(а) на сумму ${this.priceCalc()} руб.`);
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