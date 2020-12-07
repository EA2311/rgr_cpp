export class Router {
    constructor() {
        this.routes = {
            '404': ()=> {
            		console.log('Not found');
            }
        };

        this.mainContentPages = document.querySelectorAll('.main-content .page');
        window.addEventListener('hashchange', () => {
            document.querySelector('#spinnerMain').classList.remove('hider');
            this.render(decodeURI(window.location.hash));
        })
    }

    addRoute(route, action) {
        this.routes[route] = action;
    }

    render(url) {
        let temp = url.split('/')[0];

        [...this.mainContentPages].forEach((page) => {
            if (!page.classList.contains('hider')) {
                page.classList.add('hider');
            }
        });
        this.routes[temp] ? this.routes[temp]() : this.routes['404']();
    }

}
