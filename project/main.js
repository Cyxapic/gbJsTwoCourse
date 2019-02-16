class ProductsList {
    constructor(container = '#app', title = '#title') {
        this.container = container;
        this.title = title;
        this.categories = [];
        this.goods = [];
        this.allProducts = [];
        this._getCategories();
        this._getProducts();
    }
    _getCategories() {
        fetch('https://dev.cyxapic.ru/api/v1/categories/').then(
            resp => resp.json().then(data => {
                this.categories = data;
                this._renderCategory();
            })
        );
    }
    _getProducts() {
        fetch('https://dev.cyxapic.ru/api/v1/products/').then(
            resp => resp.json().then(data => {
                this.goods = data;
                this.renderProducts();
            })
        );
    }

    _setTitle() {
        document.querySelector(this.title).innerHTML = '<h3>Добавте товары желаемые товары в корзину:</h3>';
    }

    renderProducts() {
        this._setTitle();
        const block = document.querySelector(this.container);
        let productItemsTpl = []
        for (let product of this.goods) {
            const productObj = new ProductItem(product.id, product.title, product.price, product.img);
            this.allProducts.push(productObj);
            productItemsTpl.push(productObj.render());
        }
        block.innerHTML = `
            <div class="columns is-multiline">
                ${productItemsTpl.join('')}
            </div>`;
    }

    _renderCategory() {
        const block = document.querySelector('#category');
        block.innerHTML = '';
        for (let category of this.categories) {
            const categoryObj = new CategoryItem(category.id, category.title);
            block.insertAdjacentHTML('beforeend', categoryObj.render());
        }
    }
}

class CategoryItem {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    render() {
        return `<a class="navbar-item" data-catid=${this.id}>${this.title}</a>`;
    }
}

class ProductItem {
    constructor(id, title, price, img = 'https://placehold.it/200x150') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="column is-multiline is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${this.img}" alt="Product image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <p><strong>Наименование:</strong> ${this.title}</p>
                                <p><strong>Цена:</strong> ${this.price}</p>
                                <button class="button is-light"
                                        data-action="add"
                                        data-productid=${this.id}>В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

// класс Корзина
class Cart {
    constructor(products, container = '#app', title = '#title') {
        this.products = products;
        this.container = container;
        this.title = title;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.cartItems = [];
        this.totlaItemBlock = document.querySelector('#total');
        this.totlaItemBlock.innerHTML = 0;
        this.actions = {
            'add': (id) => this._addItem(id),
            'del': (id) => this._delItem(id),
        }
    }
    render() {
        this._setTitle();
        const block = document.querySelector(this.container);
        let cartItemsTpl = []
        for (let item of this.cartItems) {
            const cartObj = new CartItem(item);
            cartItemsTpl.push(cartObj.render());
        }
        block.innerHTML = `
            <div class="columns is-multiline">
                ${cartItemsTpl.join('')}
            </div>
            <div class="columns">
                ${this._calcTotalPrice()}
            </div>`;
    }
    /**
     * В зависимости от события добавление/удаление вызываем метод
     */
    buttonCartListener() {
        const btn = document.querySelector(this.container);
        btn.addEventListener('click', event => {
            const btn = event.target;
            const action = btn.dataset.action
            const productid = Number.parseInt(btn.dataset.productid);
            if (btn.tagName === 'BUTTON') {
                this.actions[action](productid);
            };
        });
    }
    /**
     * добавить в корзину товар
     * @param {Number} id - продукта
     */
    _addItem(id) {
        let productItem = this._getItem(id);
        if (productItem) {
            let found = false;
            this.cartItems.forEach(item => {
                if (productItem.id === item.id) {
                    item.quantity += 1;
                    found = true;
                    return;
                }
            });
            if (!found) {
                productItem.quantity = 1;
                this.cartItems.push(productItem);
            }
            this.totlaItemBlock.innerHTML = this.cartItems.length;
        }
    }
    /**
     * Удалить товар из корзины
     * @param {Number} id - продукта
     */
    _delItem(id) {
        let productItem = this._getItem(id);
        if (productItem) {
            let index = null;
            this.cartItems.forEach((item, idx) => {
                if (productItem.id === item.id) {
                    if(item.quantity === 1){
                        index = idx;
                    } else {
                        item.quantity -= 1;
                    }
                }
            });
            if(index !== null){
                if (index === 0){
                    this.cartItems.shift();
                } else {
                    this.cartItems.splice(index, 1);
                }
            }
            this.totlaItemBlock.innerHTML = this.cartItems.length;
            this.render();
        }
    }
    /**
     * Получаем из массива объект товара
     * @param {Number} id - продукта
     */
    _getItem(id) {
        let productItem = null;
        this.products.forEach(product => {
            if (product.id === id) {
                productItem = product;
            }
        });
        return productItem;
    }
    // итогавая стоимость
    _calcTotalPrice() {
        if (this.cartItems.length === 0) {
            return '';
        }
        return `
            <div>Товаров на сумму: 
                <strong>
                    ${this.cartItems.reduce((resultPrice, item)=>(+item.price * +item.quantity) + resultPrice, 0)}
                </strong>
            </div>`;
    }
    // итоговое количество товара в корзине
    calcTotalQuantity() {}
    // Вывод на страницу
    _setTitle() {
        let empty = '';
        if (this.cartItems.length === 0) {
            empty = 'пуста!'
        }
        document.querySelector(this.title).innerHTML = `<h3>Ваша корзина ${empty}</h3>`;
    }
}

class CartItem {
    constructor(item) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = item.img;
        this.quantity = item.quantity;
    }
    render() {
        return `<div class="column is-multiline is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${this.img}" alt="Product image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <p><strong>Наименование:</strong> ${this.title}</p>
                                <p><strong>Цена:</strong> ${this.price}</p>
                                <p><strong>Количество:</strong> ${this.quantity}</p>
                                <button class="button is-light"
                                        data-action="del"
                                        data-productid=${this.id}>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

class Route {
    constructor(container = '#app') {
        this.container = container;
        this.mainPageObj = new ProductsList(container = this.container);
        this.cartObj = new Cart(this.mainPageObj.allProducts, container = this.container);
        this.cartObj.buttonCartListener();
        this.routers = this._getRourets();
        this.menuLinkListener();
    }
    menuLinkListener() {
        document.querySelector('nav').addEventListener('click', (event) => {
            if (event.target.hasAttribute('href')) {
                const route = event.target.getAttribute('href');
                if (route in this.routers) this.routers[route]();
            }
        });
    }

    _getRourets() {
        return {
            '#main': () => this.mainPageObj.renderProducts(),
            '#cart': () => this.cartObj.render(),
        }
    }
}

const router = new Route();