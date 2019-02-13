'use strict';
// *Некая сеть фастфуда предлагает несколько видов гамбургеров:

// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий). 

// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).

// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Order {
    constructor(form) {
        this.orderForm = form;
        this.burgers = [];
        this.toppings = [];
        this.order = [];
        this._getBurgers();
        this._getToppings();
    }
    _getBurgers() {
        this.burgers = [{
                type: 'small',
                name: 'Маленький бургер',
                price: 50,
                calories: 20
            },
            {
                type: 'big',
                name: 'Большой бургер',
                price: 100,
                calories: 40
            },
        ];
    }
    _getToppings() {
        this.toppings = [{
                type: 'chees',
                name: 'сыр',
                price: 10,
                calories: 20
            },
            {
                type: 'salad',
                name: 'салат',
                price: 20,
                calories: 5
            },
            {
                type: 'potato',
                name: 'картофель',
                price: 15,
                calories: 10
            },
            {
                type: 'spices',
                name: 'приправа',
                price: 15,
                calories: 0
            },
            {
                type: 'mayonez',
                name: 'майонез',
                price: 20,
                calories: 5
            },
        ];
    }
    _calculatePrice() {
        let price = 0;
        this.order.forEach(item=>{
            price += item.price;
        });
        return price;
    }
    _calculateCalories() {
        let calories = 0;
        this.order.forEach(item=>{
            calories += item.calories;
        });
        return calories;
    }
    _createOrder() {
        const customerBurger = this.orderForm.querySelector('select[name="burgers"]').value;
        this.burgers.forEach((burger) => {
            if (burger.type === customerBurger) {
                this.order.push(burger);
                return
            }
        });
        this.toppings.forEach((topping) => {
            if (this.orderForm.querySelector(`input[name="${topping.type}"`).checked) {
                this.order.push(topping);
            }
        });
    }
    _renderOrder() {
        let orderTpl = '<ul>';
        this.order.forEach(item=>{
            orderTpl = orderTpl.concat(`<li><b>${item.name}:</b> ${item.price}</li>`);
        });
        orderTpl = orderTpl.concat('</ul>');
        return orderTpl;
    }
    render(totalSelctor='#total') {
        const totlaBlock = document.querySelector(totalSelctor);
        this._createOrder();
        totlaBlock.innerHTML = `
            <div>Ваш заказ: ${this._renderOrder()}</div>
            <div>Итого сумма заказа: <b>${this._calculatePrice()}</b></div>
            <div>Итого калорий в заказе: <b>${this._calculateCalories()}</b></div>`;
        this.orderForm.reset();
    }
}

document.querySelector('#create').addEventListener('click', (event) => {
    event.preventDefault();
    const order = new Order(document.querySelector('#order'));
    order.render();
});
