const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
});

//scroll lock

const disableScroll = () => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${scrollWidth}px;
    `;
};

const enableScrol = () => {
    document.body.style.cssText = '';
    window.scroll({ top: document.body.dbScrollY });
};

// modal window

const subheaderCart = document.querySelector('.subheader__cart'),
    cartOverlay = document.querySelector('.cart-overlay'),
    cartModalOpen = () => {
        cartOverlay.classList.add('cart-overlay-open');
        disableScroll();
    },
    cartModalClose = () => {
        cartOverlay.classList.remove('cart-overlay-open');
        enableScrol();
    };

//db request

const getData = async () => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`);
    }
};

const getGoods = (callback, value) => {
    getData()
        .then( data => { 
            if(value) {
                callback(data.filter(item => item.category === value))
            } else {
                callback(data);
            }
        })
        .catch( err => {console.log(err);} );
};

subheaderCart.addEventListener('click', cartModalOpen);
cartOverlay.addEventListener('click', (e) => {
    if(e.target.classList.contains('cart__btn-close') || e.target === cartOverlay) { 
        cartModalClose();
    }
});

try {

    const goodsList = document.querySelector('.goods__list');

    if (!goodsList) {
        throw 'This is not a goods page!';
    }

    const createCard = ({ id, preview, price, brand, name, sizes}) => {

        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML=`
            <article class="good">
                <a class="good__link-img" href="card-good.html#${ id }">
                    <img class="good__img" src="goods-image/${ preview }" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${ price } &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${sizes ?
                        `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`
                        :''}
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                </div>
            </article>
        `;
        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach(item => {
            const card = createCard(item);
            goodsList.append(card);
        });
    };


    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        document.querySelector('.goods__title').textContent = hash.toUpperCase();
        getGoods(renderGoodsList, hash);
    });

    getGoods(renderGoodsList, hash);

} catch(err) { console.warn(err) }