import {EventEmitter} from '../evente-emitter.js';
import {MethodsAJAX} from '../methodsAJAX';

export class NewsModel extends EventEmitter {
    constructor() {
        super();
        this.methodsAJAX = new MethodsAJAX();
        this.allNews = [];
    }

    /**
     * get news from server
     */
    getNews() {
        if (this.allNews.length > 0) {
            this.emit('getNews', this.allNews);

        } else {
            this.getNewsByFetch()
                .then(() => {

                    this.emit('getNews', this.allNews);
                })
                .catch(err => console.log(err));
        }
    }

    /**
     * Internal method to get news from server
     * @returns {Promise<T | void>}
     */
    getNewsByFetch() {
        return this.methodsAJAX.getDataFetch('http://localhost:3006/news')
            .then((allNews) => {

                this.allNews = allNews;
            })
            .catch(err => console.log(err));
    }

    /**
     * make filter News
     * @param filterStr -- filter string
     */
    filterNews(filterStr) {
        if (this.allNews.length > 0) {
            this.filterNewsIn(filterStr);

        } else {
            this.getNewsByFetch()
                .then(() => {
                    this.filterNewsIn(filterStr);
                })
                .catch(err => console.log(err));
        }
    }

    /**
     * Check if the description of the self includes the string
     * @param filterStr -- filter String
     */
    filterNewsIn(filterStr) {
        let result = [];
        this.allNews.forEach((item) => {
            if (item.description.includes(String(filterStr))
                || item.description.toLowerCase()
                    .includes(String(filterStr))) {
                result.push(item);
            }
        });

        this.emit('filterNews', result);
    }

    addIdSelectedNews(idSelectedOneNews) {
        this.idSelectedOneNews = idSelectedOneNews;
    }
}
