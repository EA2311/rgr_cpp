import {MethodsAJAX} from "../methodsAJAX";
import {EventEmitter} from "../evente-emitter";

export class CommentsModel extends EventEmitter {
    constructor() {
        super();
        this.methodsAJAX = new MethodsAJAX();
    }

    /**
     * I receive comments for a specific product.
     * @param idProd -- number
     */
    getCommentsFromServer(idProd) {
        this.methodsAJAX.getDataFetch(`http://localhost:3006/commentsProd${idProd}`)
            .then((arrComments) => {
                this.arrComments = arrComments;
                this.emit('getComments', arrComments);
            })
            .catch((e) => console.log(e))
    }

    /**
     * add a comment to the server
     * @param obj -- {name, text, indexProd};
     */
    sentComment(obj) {
        this.methodsAJAX.sendData(`http://localhost:3006/commentsProd${obj.indexProd}`, obj)
            .then(() => {
                if (this.arrComments) {
                    this.arrComments.push(obj);
                    this.emit('getComments', this.arrComments);
                } else {
                    this.getCommentsFromServer(obj.indexProd);
                }
            })
            .catch((e) => console.log(e))
    }
}
