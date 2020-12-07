import {EventEmitter} from '../evente-emitter';

export class ProductsView extends EventEmitter {
    constructor() {
        super();

    }

    /**
     * show Products Page
     * @param allProducts -- all Products of server
     * @param userLogEmail -- (string)userLogEmail
     */
    showProductsPage(allProducts, userLogEmail) {
        const list = document.querySelector('.products-list');
        const page = document.querySelector('.all-products');

        if (!this.savedProductsHtml) {
            this.buildProductsPage(allProducts, list, userLogEmail);
        }

        if (!userLogEmail) {
            this.addHideButtonAddProd();
            this.addHideButtonComments();
        } else {
            this.removeHideButtonAddProd();
            this.removeHideButtonComments();
        }

        document.querySelector('#spinnerMain')
            .classList
            .add('hider');
        page.classList.remove('hider');
    }

    /**
     * draw Products Page. Add listeners
     * @param allProducts -- all Products of server
     * @param list -- list all products on page
     */
    buildProductsPage(allProducts, list) {
        const theTemplateScript = document.getElementById('products-template').innerHTML;
        const theTemplate = Handlebars.compile(theTemplateScript);

        this.savedProductsHtml = theTemplate(allProducts);
        list.innerHTML = this.savedProductsHtml;
        let buttonsAdd = document.querySelectorAll('.add-to-cart');

        const imgProduct = document.querySelectorAll('.imgProduct');
        const imgModalProd = document.querySelector('.imgModalProd');
        const  butShowComments = document.querySelectorAll('.butShowComments');

        buttonsAdd.forEach((but) => {
            but.addEventListener('click', (e) => {
                let idElem = e.target.getAttribute('id');
                this.showButtAddedProduct(e.target);
                this.emit('addProdToCat', idElem);
            });
        });

        imgProduct.forEach((img) => {
            img.addEventListener('click', (e) => {
                let srcElem = e.target.getAttribute('src');
                imgModalProd.setAttribute('src', `${srcElem}`);
            });
        });

        butShowComments.forEach((item) => {
            item.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-index');
                this.emit('pressedButReadComments', id);
            })
        })
    }

    /**
     * Change the view of button to 1 sek
     * @param target -- element-button
     */
    showButtAddedProduct(target) {
        target.innerText = 'Added to cart';
        setTimeout(() => {
            target.innerText = 'to cart';
        }, 1000);
    }

    /**
     * add class-hide to button
     */
    addHideButtonAddProd() {
        let buttonsAdd = document.querySelectorAll('.add-to-cart');
        buttonsAdd.forEach((item) => {
            item.classList.add('hideButtonAddProd');
        });
    }

    /**
     * add class-hide to button
     */
    addHideButtonComments() {
        let buttonsAdd = document.querySelectorAll('.butShowComments');
        buttonsAdd.forEach((item) => {
            item.classList.add('hideButtonComments');
        });
    }

    /**
     * remove class-hide from the button
     */
    removeHideButtonAddProd() {
        let buttonsAdd = document.querySelectorAll('.add-to-cart');
        buttonsAdd.forEach((item) => {
            item.classList.remove('hideButtonAddProd');
        });
    }

    /**
     * remove class-hide from the button
     */
    removeHideButtonComments() {
        let buttonsAdd = document.querySelectorAll('.butShowComments');
        if (!buttonsAdd) return;
        buttonsAdd.forEach((item) => {
            item.classList.remove('hideButtonComments');
        });
    }

}
