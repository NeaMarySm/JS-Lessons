'use strict';
const goods = [
    {   product_name: 'шампунь',
        product_id: 1238,
        price: 250,
    },
    {   product_name:'зубная паста', 
        product_id: 1242,
        price: 80,
    },
    {   product_name: 'мыло',
        product_id: 1678,
        price: 45,
    },
];
const catalog = {
    catalogContainer: null,
    goods,
    cart: {},
    catalogGoods: [],
    addGoods(){
        Object.assign(this.catalogGoods, this.goods);
    },
    catalogRender(cart){
        this.catalogContainer = document.getElementById('catalog');
        this.cart = cart;
        this.createCatalogList();
        this.addToCart();   
    },
    createCatalogList(){
        this.addGoods();
        let productList = '';
        this.catalogGoods.forEach((good) => {
                productList += 
                `<div class="catalog-item">
                    <div>Товар: ${good.product_name}</div>
                    <div class = "product-price">Цена за единицу: ${good.price} руб.</div>
                    <button class="cart-add btn" data-product_id="${good.product_id}" >Добавить в корзину</button>
                </div>`
        });
        this.catalogContainer.innerHTML += productList;
    },
    
    addToCart(){
        this.catalogContainer.addEventListener('click', event => this.getProd(event));
    },
    getProd(event){
        if(!event.target.classList.contains('cart-add')) return;
        let prod_id = +event.target.dataset.product_id;
        let prodToAdd = this.catalogGoods.find((good) => good.product_id === prod_id);
        this.cart.addToCart(prodToAdd);
    }
}

const cart = {
    cartContainer: null,
    cartGoods: [],
    render() {
        if (this.cartGoods.length > 0) {
            this.cartListRender();
        } else {
            this.renderEmptyCart();
        }
    },
    addToCart(product){
        const alreadyInCart = this.cartGoods.find(({product_id}) => product.product_id === product_id);
        if(alreadyInCart){
            alreadyInCart.quantity++;
        } else {
            this.cartGoods.push({...product, quantity: 1});
        }
        this.render();
    },
    cartInit(){
        this.cartContainer = document.getElementById('cartContainer');  
        this.render();         
    },

    cartListRender(){ 
        this.cartContainer.innerHTML = '';
        let cartList = '';
        this.cartGoods.forEach((good) => {
            cartList += 
            `<div class="catalog-item">
                Товар: ${good.product_name} ${good.quantity}шт Стоимость: ${good.price * good.quantity} руб.
            </div>`
        });
        this.cartContainer.innerHTML += cartList;
        this.cartContainer.insertAdjacentHTML('beforeend', `В корзине ${this.quantityCalc()} товаров(а) на сумму ${this.priceCalc()} руб.`);  
        this.addClearButton();    
    },

    renderEmptyCart(){
        this.cartContainer.innerHTML = '';
        this.cartContainer.insertAdjacentHTML('beforeend', 'Корзина пуста');
    },
    addClearButton(){
        const clearButton = document.createElement('button');
        clearButton.classList.add('clear-btn');
        clearButton.textContent = 'Очистить корзину';
        this.cartContainer.appendChild(clearButton);
        clearButton.addEventListener('click', () => {
            this.cartGoods = [];
            this.render();
        })
    },
    priceCalc(){
        return this.cartGoods.reduce((price, good) => {
            return price + good.price * good.quantity;
        }, 0);
    },
    quantityCalc() {
        return this.cartGoods.reduce((quantity, good) => {
            return quantity + good.quantity;
        }, 0);
    },

}
catalog.catalogRender(cart);
cart.cartInit();
