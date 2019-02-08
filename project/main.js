const products = [{
        title: 'Notebook',
        price: 2000
    },
    {
        title: 'Mouse',
        price: 20
    },
    {
        title: 'Keyboard',
        price: 35
    },
    {
        title: 'Gamepad',
        price: 48
    },
    {
        title: 'Chair',
        price: 500
    },
    {
        title: 'Pencil',
        price: 4
    },
    {
        title: 'Pen',
        price: 5
    },
];

/**
 * Function render a product template string
 * @param {object} product
 * @returns {string} - product template string
 */
function renderProduct(product) {
    return `<div class="column is-multiline is-one-quarter">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <p><strong>Наименование:</strong> ${product.title}</p>
                    <p><strong>Цена:</strong> ${product.price}</p>
                    <a href="#">В корзину</a>
                </div>
            </div>
        </div>
    </div>`;
}
/**
 * Function render products template and output in document element
 * @param {array} list - array of products
 */
const renderPage = list => {
    const productList = list.map(item => renderProduct(item));
    document.querySelector('#products').innerHTML = productList.join('');
};

renderPage(products);
