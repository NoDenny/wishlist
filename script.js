class Table {
    // Создание таблицы с заголовками
    constructor(params, parentElem) {
        const tableElem = document.createElement('table');
        tableElem.classList.add('table');
        const tr = document.createElement('tr');
        tableElem.appendChild(tr);
        const tableBodyElem = document.createElement('tbody');
        tableElem.appendChild(tableBodyElem);

        params.forEach((param) => {
            const th = document.createElement('th');
            th.textContent = param.columnTitle;
            tr.appendChild(th);
        });

        parentElem.appendChild(tableElem);

        this.tableElem = tableElem;
        this.tableBodyElem = tableBodyElem;
    }

    // Добавление строки с товаром
    addProduct (product) {
        this.tableBodyElem.appendChild(product);
    }
}

class Product {
    // Создание объекта товара
    constructor(id, name, price, photoLink, prodLink) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.photoLink = photoLink;
        this.prodLink = prodLink;
    }

    // Создание элемента товара
    create() {
        const row = document.createElement('tr');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const price = document.createElement('td');

        const photo = document.createElement('td');
        const photoImgElem = document.createElement('img');
        photoImgElem.classList.add('product__photo')

        const prodLink = document.createElement('td');
        const prodLinkBtn = document.createElement('button');
        prodLinkBtn.type = 'button';
        prodLinkBtn.classList.add('product__link-button')

        id.textContent = this.id;
        name.textContent = this.name;
        price.textContent = this.price;
        photoImgElem.src = this.photoLink;
        photoImgElem.alt = this.name;
        prodLinkBtn.setAttribute('onclick', `window.open('${this.prodLink}','_blank');`)
        prodLinkBtn.textContent = 'Show product'
        
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(price);

        row.appendChild(photo);
        photo.appendChild(photoImgElem);

        row.appendChild(prodLink);
        prodLink.appendChild(prodLinkBtn);
        
        this.productElem = row;

        return row;
    }
}

class Form {
    // Создание формы
    constructor(params, parentElem) {
        const form = document.createElement('form');
        form.classList.add('form')

        params.forEach((param) => {
            const inputContainer = document.createElement('div');
            inputContainer.classList.add('form__input-container');

            const inputName = document.createElement('div');
            inputName.classList.add('form__input-name');
            inputName.textContent = param.columnTitle;

            const inputField = document.createElement('input');
            inputField.classList.add('form__input')
            inputField.name = param.inputName;
            inputField.type= 'text';

            inputContainer.appendChild(inputName);
            inputContainer.appendChild(inputField);

            form.appendChild(inputContainer);
        })

        const button = document.createElement('button');
        button.name = 'form__button';
        button.classList.add('form__button')
        button.type = 'submit';
        button.textContent = 'Add to wishlist';
        button.setAttribute('disabled', 'disabled');

        this.buttonElem = button;
        this.formElem = form;

        form.appendChild(button);
        parentElem.appendChild(form);
    }
}

// Товары для примера
const productsData = [
    {article: '000100',
    name: 'Nike Air Edge 270',
    price: '$150',
    photo: 'https://kickside.com.ua/wp-content/uploads/2019/08/Q8764001_a1.jpg',
    productLink: 'https://werare.com.ua/sneakers/nike-air-edge-270-white-black-orange-aq8764-001'
    },
    {article: '000101',
    name: 'Nike Air Max 270 React ENG Travis Scott Cactus Trails',
    price: '$540',
    photo: 'https://sneakers123.s3.amazonaws.com/release/185126/nike-air-max-270-react-eng-travis-scott-cactus-trails-ct2864-200-1.jpg',
    productLink: 'https://sneakers123.com/ru/nike-air-max-270-react-eng-travis-scott-cactus-trails-ct2864-200'
    },
    {article: '000102',
    name: 'Off White x Nike Air Force 1 Low',
    price: '$270',
    photo: 'https://static.highsnobiety.com/thumbor/QTQfICIZvpFfUCc85dodywpkz0c=/1600x1068/static.highsnobiety.com/wp-content/uploads/2021/03/26181743/off-white-nike-air-force-1-canary-yellow-release-date-price-011.jpg',
    productLink: 'https://www.reactrun.com/product/6410'
    }
]

// Переменные для полей формы и заговоловков таблицы
const productParamsData = [
    {columnTitle: 'Article', inputName: 'article'},
    {columnTitle: 'Name', inputName: 'name'},
    {columnTitle: 'Price', inputName: 'price'},
    {columnTitle: 'Photo', inputName: 'photo'},
    {columnTitle: 'Product Link', inputName: 'productLink'},
]

// Переменные для формы
const formContainer = document.querySelector('.form__wrapper');
const form = new Form (productParamsData, formContainer);
const formElem = form.formElem;
const formButton = form.buttonElem;

// Переменные для таблицы
const tableContainer = document.querySelector('.table__container');
const table = new Table (productParamsData, tableContainer);


// Функция: Валидация формы
function checkFormValidity() {
    const articleValue = formElem.elements.article.value;
    const nameValue = formElem.elements.name.value;
    const priceValue = formElem.elements.price.value;
    const photoValue = formElem.elements.photo.value;
    const productLinkValue = formElem.elements.productLink.value;

    const inputValues = [articleValue, nameValue, priceValue, photoValue, productLinkValue];

    if(inputValues.every((value) => {if (value.length) {return true}})) {
        return true;
    } else {
        return false;
    }
}

// Функция: Состояние кнопки в форме 
function setButtonAbility() {
    if(checkFormValidity()) {
        formButton.removeAttribute('disabled');
        formButton.classList.add('form__button_active');
    } else {
        formButton.setAttribute('disabled', 'disabled');
        formButton.classList.remove('form__button_active');
    }
}

// Функция: Добавление товара из формы в таблицу
function addProductFromForm (event) {
    event.preventDefault();
    const articleValue = formElem.elements.article.value;
    const nameValue = formElem.elements.name.value;
    const priceValue = formElem.elements.price.value;
    const photoValue = formElem.elements.photo.value;
    const productLinkValue = formElem.elements.productLink.value;

    if(checkFormValidity()) {
        const product = new Product(articleValue, nameValue, priceValue, photoValue, productLinkValue);
        const productElem = product.create();
        table.addProduct(productElem);
        formElem.reset();
        formButton.setAttribute('disabled', 'disabled');
    }
}

// Вывод товаров в таблицу для примера
productsData.forEach((product) => {
    const newProduct = new Product(product.article, product.name, product.price, product.photo, product.productLink);
    const productElem = newProduct.create();
    table.addProduct(productElem);
})

// Слушатель события: Состояние кнопки при валидации формы
formElem.addEventListener('input', setButtonAbility);
// Слушатель события: Добавление товара в таблицу из формы
formButton.addEventListener('click', addProductFromForm);