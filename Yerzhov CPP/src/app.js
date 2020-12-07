import { Router } from './router.js';
import { ProductsView } from './products/products-view.js';
import { ProductsModel } from './products/products-model.js';
import { CartModel } from './cart/cart-model.js';
import { CartView } from './cart/cart-view.js';
import { AppModule } from './app-module.js';
import { LoginModel } from './login/login-model.js';
import { LoginView } from './login/login-view.js';
import { AboutModel } from './about/about-model.js';
import { AboutView } from './about/about-view.js';
import { NewsModel } from './news/news-model.js';
import { NewsView } from './news/news-view.js';
import {CommentsModel} from "./comments/comments-model";
import {CommentsView} from "./comments/comments-view";


window.addEventListener('load', () => {
    const router = new Router();
    const productsModel = new ProductsModel();
    const productsView = new ProductsView();
    const cartModel = new CartModel();
    const cartView = new CartView();
    const loginModel = new LoginModel();
    const loginView = new LoginView();
    const aboutModel = new AboutModel();
    const aboutView = new AboutView();
    const newsModel = new NewsModel();
    const newsView = new NewsView();
    const commentsModel = new CommentsModel();
    const commentsView = new CommentsView();

   const controller = new AppModule(
       router,
       newsModel,
       newsView,
       productsModel,
       productsView,
       cartModel,
       cartView,
       aboutModel,
       aboutView,
       loginModel,
       loginView,
       commentsModel,
       commentsView
   );
});
