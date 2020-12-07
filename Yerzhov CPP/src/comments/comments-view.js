import {EventEmitter} from "../evente-emitter";

export class CommentsView extends EventEmitter {
    constructor() {
        super();
        this.addListenerSentComment();
    }

    /**
     * @param id -- (number) product identifier
     * @param userLogEmail -- (string) user name
     */
    customizeButtonSentCom(id, userLogEmail) {
        const butSentComment = document.querySelector('.commentsModal .butSentComment');
        butSentComment.setAttribute('data-index', `${id}`);
        butSentComment.setAttribute('data-userLogEmail', `${userLogEmail}`);
    }

    /**
     * add a comments to the modal
     * @param comments -- (array)
     */
    showComments(comments) {
        if (comments == []) return;
        const listUnstyled = document.querySelector('.commentsModal .list-unstyled');
        listUnstyled.innerHTML = '';
        const commentsTemplate = `{{#each this}} 
        <li class="media">
            <img class="mr-3" src="../../assets/images/user-ava.png" height="50rem" alt="image">
            <div class="media-body">
            <h5 class="mt-0 mb-1">{{name}}</h5>
            <div class="spanTextComment"> {{text}}</div>   
            </div>
        </li>
                {{/each}}`;

        const theTemplate = Handlebars.compile(commentsTemplate);

        this.savedProductsHtml = theTemplate(comments);
        listUnstyled.innerHTML = this.savedProductsHtml;
    }

    /**
     * add a Listener to button 'SentComment'
     */
    addListenerSentComment() {
        const butSentComment = document.querySelector('.commentsModal .butSentComment');
        butSentComment.addEventListener('click', (event) => {
            const userLogEmail = event.target.getAttribute('data-userLogEmail');
            const index = event.target.getAttribute('data-index');
            const text = document.querySelector('.commentsModal textarea').value;

            if ( text === '')  return;
            this.objComment = {
                name: userLogEmail,
                text,
                indexProd: index,
            };

            this.emit('sentComment', this.objComment);
        });
    }

}
