import {EventEmitter} from '../evente-emitter';

export class CartView extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * show Cart Page
     * @param allProducts -- all Products in server
     * @param cartObgLS -- cart from Local Storage
     */
    showCartPage(allProducts, cartObgLS) {
        const cartPage = document.querySelector('.cart-page');
        cartPage.innerHTML = '';

        if (Object.keys(cartObgLS).length === 0) {
            let viewCart = document.createElement('div');
            viewCart.innerHTML = `<div class = "cartIsEmpty">cart is empty!</div>`;
            cartPage.appendChild(viewCart);

            document.querySelector('#spinnerMain').classList.add('hider');
            cartPage.classList.remove('hider');

        } else {
            this.drawCart(allProducts, cartObgLS, cartPage);
            document.querySelector('.cart-page img').onload = () => {
                document.querySelector('#spinnerMain').classList.add('hider');
                cartPage.classList.remove('hider');
            }
        }
    }

    /**
     * I Use break to avoid sorting out unnecessary options.
     * I draw every cart element and add listeners.
     * @param allProducts -- all Products in server
     * @param cartObgLS -- cart from Local Storage
     * @param cartPage -- cart Page
     */
    drawCart(allProducts, cartObgLS, cartPage) {
        for (let key in cartObgLS) {
            let product;
            for (let i = 0; i < allProducts.length; i++) {
                if (String(allProducts[i].id) === String(key)) {
                    product = allProducts[i];
                    break;
                }
            }

            let viewCart = document.createElement('div');
            viewCart.innerHTML = `
<div class="col-12 prod prod-in-cart-${key}">		
		<div class="row">
				<div class="col-2 col-md-1">
						<button type="button" class="btn btn-outline-danger btn-sm delete" data-art="${key}" >x</button>
						<div class="col-11"></div>
				</div>
		</div>
		<div class="row">
				<div class="col-8 col-sm-7 col-md-4 col-lg-3"><img class="img-fluid" src="${product.image.small}"></div>
				<div class="col-12 col-md-8 col-lg-9">
						<div class="row">
								<span class="col-12 h5 mb-4 productName">${product.name}</span>
						</div>
						<div class="row">
								<div class="col-12 h6">${product.description}</div>
						</div>
						<div class="row">
								<div class="col-12 h6">Installment !!! from 4 months to 48 months !!! Across the Republic of Belarus! Shop in the center of Minsk! [pl. Victory, st. Kiselev]. Russian keyboard!!! Check the numbers through the site APPLE! You can pickup and test! Work since 2006! Discount up to 10% through the basket onliner.by until May 29</div>
						</div>
				</div>
		</div>
		<div class="row">
				<div class="col-sm-6 totalAmount">
						<span class="mr-sm-0 h5">Total amount of goods</span>
				</div>
				<div class="col-12 col-sm-6 row justify-content-end">		
						<button type="button" class="btn btn-outline-success mr-sm-0 minus" data-art="${key}">-</button>
						<span class="productCount h4">${cartObgLS[key]}</span>
						<button type="button" class="btn btn-outline-success ml-sm-0 plus" data-art="${key}">+</button>
				</div>
				<div class="col-sm-8 priceForAll">	
						<span class="h5">Price for all</span>
				</div>
				<div class="col-12 col-sm-4 justify-content-end">	
						<span class="sumProductPrice" data-art="${product.price}">${cartObgLS[key] * product.price}</span>
				</div>
		</div>
</div>`;

            viewCart.classList.add('divViewCart');
            cartPage.appendChild(viewCart);
        }

        let arrButPlus = document.querySelectorAll('.plus');
        arrButPlus.forEach((item) => {

            item.addEventListener('click', (event) => {
                let id = event.target.getAttribute('data-art');
                this.emit('addProdToCat', id);

                let productCount = document.querySelector(`.prod-in-cart-${id} .productCount`);
                productCount.innerHTML = Number(productCount.innerHTML) + 1;

                let sumProductPrice = document.querySelector(`.prod-in-cart-${id} .sumProductPrice`);
                let productPrice = sumProductPrice.getAttribute('data-art');
                sumProductPrice.innerHTML = Number(sumProductPrice.innerHTML) + Number(productPrice);
            });
        });

        let arrButDel = document.querySelectorAll('.delete');
        arrButDel.forEach((item) => {

            item.addEventListener('click', (event) => {
                let id = event.target.getAttribute('data-art');
                this.emit('delProductFromCart', id);
            });
        });

        let arrButMinus = document.querySelectorAll('.minus');
        arrButMinus.forEach((item) => {

            item.addEventListener('click', (event) => {

                let id = event.target.getAttribute('data-art');
                this.emit('minusProductFromCart', id);
            });
        });

    }

    /**
     * add to cart 'Cart is empty!'
     */
    emptyCartView() {
        let cartPage = document.querySelector('.cart-page');
        cartPage.innerHTML = '<div class = "cartIsEmpty">cart is empty!</div>';
    }

}
