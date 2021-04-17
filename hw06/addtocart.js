window.onload = function () {
    var d = document,
        productItem = d.querySelectorAll('.product-item'), // блок каждого товара
        cartCont = d.getElementById('cart'), // блок вывода данных корзины
        clearBtn = d.getElementById('clear-cart'); // кнопка очищения корзины

    // Получаем данные из LocalStorage браузера
    function getCartData() {
        return JSON.parse(localStorage.getItem('cart'));
    }
    // Записываем данные в LocalStorage браузера
    function setCartData(o) {
        localStorage.setItem('cart', JSON.stringify(o));
    };

    function addToCart(e) {
        var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
            parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
            itemId = this.getAttribute('data-id'), // ID товара
            itemTitle = parentBox.querySelector('.product-description').innerHTML, // название товара
            itemPrice = parentBox.querySelector('.item-price').innerHTML, // стоимость товара
            itemImagePath = parentBox.querySelector('.product-image').src; // картинка товара

        if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[itemId][3] += 1;
        } else { // если товара в корзине еще нет, то добавляем в объект
            cartData[itemId] = [itemTitle, itemPrice, itemImagePath, 1];
        }
        setCartData(cartData);
        showCart(cartData);
    }
    // Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
    for (var i = 0; i < productItem.length; i++) {
        productItem[i].querySelector('.product-add').addEventListener('click', addToCart);
    }

    // очищаем корзину
    clearBtn.addEventListener('click', function () {
        window.localStorage.removeItem('cart'); // удаляем корзину из LocalStorage
        cartCont.innerText = ''; // удаляем корзину из браузера
        document.getElementById('cart-sum-qnt').innerText = '' // удаляем сумму корзины из браузера
    })

    // Отображаем корзину
    function showCart(e) {
        var cartData = e, // вытаскиваем все данные корзины
            cartSum = new Number(); // создаем переменную, в которую будем заносить сумму заказа

        for (var items in cartData) {
            cartSum = cartSum + parseInt(cartData[items][1]) * parseInt(cartData[items][3]);
            document.getElementById('cart-sum-qnt').innerText = cartSum;

            if (document.getElementById('added' + items)) { // проверяем, есть ли товар в корзине
                let updateQnt = document.getElementsByClassName('qnt' + items)[0];
                updateQnt.innerHTML = 'Количество: ' + cartData[items][3]; // если есть, меняем его количество, остальное не трогаем
            } else {
                let itemCont = document.createElement('div'); // создаем новый див с уникальным id для добавленного товара
                itemCont.setAttribute('id', 'added' + items);
                cartCont.appendChild(itemCont);
                for (var i = 0; i < cartData[items].length; i++) { // берем каждый элемент нашего массива в объекте с корзинойй
                    if (i == 0) { // выводим в браузер имя товара
                        let name = document.createElement('p');
                        name.innerHTML = 'Название товара: ' + cartData[items][i];
                        itemCont.appendChild(name); 
                    }
                    if (i == 1) { // выводим в браузер цену товара
                        let price = document.createElement('p');
                        price.innerHTML = 'Цена: ' + cartData[items][i];
                        itemCont.appendChild(price); 
                    }
                    if (i == 2) { // выводим в браузер картинку товара
                        let image = document.createElement('img');
                        image.setAttribute('src', cartData[items][i]);
                        image.setAttribute('width', '200');
                        itemCont.appendChild(image); 
                    }
                    if (i == 3) { // выводим в браузер количество товара  
                        var quantity = document.createElement('p');
                        quantity.classList.add('qnt' + items);
                        quantity.innerHTML = 'Количество: ' + cartData[items][i];
                        itemCont.appendChild(quantity);               
                    }
                }
            }
        }
    }
}