const headerCityButton = document.querySelector('.header__city-button');

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

subheaderCart.addEventListener('click', cartModalOpen);
cartOverlay.addEventListener('click', (e) => {
    if(e.target.classList.contains('cart__btn-close') || e.target === cartOverlay) { 
        cartModalClose();
    }
});
