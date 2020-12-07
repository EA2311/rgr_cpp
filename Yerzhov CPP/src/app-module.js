export class AppModule {
    constructor(router,
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
                commentsView) {

        this.router = router;

        this.newsModel = newsModel;
        this.newsView = newsView;

        this.prodModel = productsModel;
        this.productsView = productsView;

        this.cartModel = cartModel;
        this.cartView = cartView;

        this.aboutModel = aboutModel;
        this.aboutView = aboutView;

        this.loginModel = loginModel;
        this.loginView = loginView;

        this.commentsModel = commentsModel;
        this.commentsView = commentsView;

        this.newsModel.on('getNews', (news) => this.generateAllNewsHTML(news));
        this.newsModel.on('filterNews', (news) => this.showFilterNews(news));

        this.prodModel.on('productsReceived', (all) => this.showProductsPage(all));
        this.productsView.on('addProdToCat', (id) => this.addProdToCat(id));

        this.cartView.on('addProdToCat', (id) => this.addProdToCat(id));
        this.cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
        this.cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));

        this.productsView.on('pressedButReadComments', (id) => this.searchComments(id));
        this.commentsModel.on('getComments', (comments) => this.showComments(comments));
        this.commentsView.on('sentComment', (objComment) => this.sentComment(objComment));


        this.aboutModel.on('getAboutData', (aboutData) => this.showAboutPage(aboutData));

        this.loginView.on('checkIsTakenEmail', (userObg) => this.checkIsTakenEmail(userObg));
        this.loginModel.on('emailIsTaken', (userStatusObj) => this.emailIsTaken(userStatusObj));
        this.loginView.on('getUserFormSignUp', (userObg) => this.signUp(userObg));
        this.loginView.on('getUserFormSignIn', (userObj) => this.signIn(userObj));
        this.loginModel.on('userIsRegistered', (email) => this.showUserAccountEmail(email));
        this.loginView.on('loginOut', () => this.loginOut());
        this.loginModel.on('goToCart', () => this.goToCart());



        this.init();
        this.initHeaderButtons();
    }

    initHeaderButtons() {
        this.navigation = document.querySelector('.navbar');
        this.home = document.querySelector('.home');
        this.products = document.querySelector('.products');
        this.cart = document.querySelector('.cart');
        this.about = document.querySelector('.about');
        this.login = document.querySelector('.login');

        this.navigation.addEventListener('click', (event) => {
            event.preventDefault();
            this.newsView.colapse(event.target);

            switch (event.target) {
                case this.home:
                    window.location.hash = '';
                    break;
                case this.products:
                    window.location.hash = '#products';
                    break;
                case this.cart:
                    window.location.hash = '#cart';
                    break;
                case this.about:
                    window.location.hash = '#about';
                    break;
                case this.login:
                    window.location.hash = '#login';
                    break;
                default:
                    break;
            }

            this.router.render(decodeURI(window.location.hash));
        });
    };

    init() {
        this.loginModel.checkIsUserRegistered();
        this.initRoutes();
        this.newsModel.getNews();
    }

    initRoutes() {
        this.router.addRoute('', this.renderHomePage.bind(this));
        this.router.addRoute('#filter', this.renderFilterResults.bind(this));
        this.router.addRoute('#oneNews', this.renderOneNewsPage.bind(this));
        this.router.addRoute('#products', this.renderProductsPage.bind(this));
        this.router.addRoute('#cart', this.renderCartPage.bind(this));
        this.router.addRoute('#about', this.renderAboutPage.bind(this));
        this.router.addRoute('#login', this.renderLoginPage.bind(this));
        this.router.addRoute('404', this.renderErrorPage.bind(this));
    }

    generateAllNewsHTML(news) {
        this.newsView.generateAllNewsHTML(news);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }

    renderHomePage() {
        this.newsView.showNewsPage();
    }

    renderFilterResults() {
        const filter = this.newsView.getCurrentFilterState();
        this.newsModel.filterNews(filter);
    }

    showFilterNews(arrFilterNews) {
        this.newsView.showFilterNews(arrFilterNews);
    }

    renderOneNewsPage() {
        const idSelectedOneNews = this.newsView.getCurrentOneNewsState();
        this.newsModel.addIdSelectedNews(idSelectedOneNews);
        this.newsView.showOneNewsPage(this.newsModel.allNews, idSelectedOneNews);
    }

    renderProductsPage() {
        this.prodModel.getProducts();
    }

    showProductsPage(allProducts) {
        this.productsView.showProductsPage(allProducts, this.loginModel.userLogEmail);
    }

    searchComments(id){
        this.commentsView.customizeButtonSentCom(id, this.loginModel.userLogEmail);
        this.commentsModel.getCommentsFromServer(id);
    }

    showComments(comments){
        this.commentsView.showComments(comments);
    }

    sentComment(obj) {
        this.commentsModel.sentComment(obj);
    }

    renderCartPage() {
        if (this.prodModel.allProducts.length && this.prodModel.allProducts.length > 0) {
            this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cart);
        } else {
            this.prodModel.getProdPromise()
                .then(() => {
                    this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cart);
                })
                .catch(e => console.log(e))
        }
    }

    addProdToCat(id) {
        this.cartModel.addProductToCat(id);
    }

    minusProductFromCart(id) {
        this.cartModel.minusProduct(id);
        this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cart);
    }

    delProductFromCart(id) {
        this.cartModel.delProduct(id);
        this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cart);
    }

    goToCart() {
        this.cartModel.cart = {};
        window.location.hash = '#cart';
    }

    renderAboutPage() {
        this.aboutModel.getAboutData();
    }

    showAboutPage(aboutData) {
        this.aboutView.showAboutPage(aboutData);
    }

    renderLoginPage() {
        this.loginView.showLoginPage();
    }

    checkIsTakenEmail(userObg) {
        this.loginModel.checkIsTakenEmail(userObg);
    }

    emailIsTaken(userStatusObj) {
        this.loginView.emailIsTaken(userStatusObj);
    }

    signUp(userObg) {
        this.loginModel.signUp(userObg);
    }

    showUserAccountEmail(email) {
        this.loginView.showUserAccountEmail(email);
    }

    signIn(userObg) {
        this.loginModel.signIn(userObg);
    }

    loginOut() {
        this.loginModel.loginOut();
        this.productsView.addHideButtonAddProd();
        this.cartView.emptyCartView();
        this.productsView.addHideButtonComments();
    }

    renderErrorPage() {
        const page = document.querySelector('.error');
        page.classList.remove('hider');
    }
}



