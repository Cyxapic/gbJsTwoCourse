class ProductsList {
    constructor(container = '#products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
    }
    _getProducts(){
       this.goods = [
           {title: 'Notebook', price: 2000},
           {title: 'Mouse', price: 20},
           {title: 'Keyboard', price: 35},
           {title: 'Gamepad', price: 48},
           {title: 'Chair', price: 500},
       ];
    }
    _totalGoogsPrice() {
        let total = 0;
        this.allProducts.forEach(product=>{
            total += +product.price;
        });
        document.querySelector('#total').innerText = total;
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product.title, product.price);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        this._totalGoogsPrice();
    }
}

class ProductItem {
    constructor(title, price, img = 'https://placehold.it/200x150'){
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render(){
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
                                        data-title=${this.title}
                                        data-price=${this.price}
                                        data-img=${this.img}>В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

// класс Корзина
class Cart {
    constructor(container = '#products') {
        this.container = container;
        // итоговая стоимость товара в корзине
        this.totalPrice = 0;
        // соличество позиций в корзине
        this.totalQuantity = 0;
        // Массив объектов в корзине.
        this.items = [];
    }
    // добавить в корзину товар
    addItem() {
        const btn = document.querySelector(this.container);
        btn.addEventListener('click', event=>{
            if (event.target.tagName === 'BUTTON'){
                console.log(event.target.dataset);
            }
        });
    }
    // вспомогательный метод для проверки товар в рзине или нет
    _chekItem(newItem) {
    }
    // Удалить товар из корзины
    delItem() {
    }
    // итогавая стоимость
    calcTotalPrice() {
    }
    // итоговое количество товара в корзине
    calcTotalQuantity() {
    }
    // Вывод на страницу
    render() {
    }
}

let products = new ProductsList();
const cart = new Cart();
products.render();
cart.addItem();