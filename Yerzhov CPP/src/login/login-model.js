import {EventEmitter} from '../evente-emitter';
import {MethodsAJAX} from '../methodsAJAX';

export class LoginModel extends EventEmitter {
    constructor() {
        super();
        this.methodsAJAX = new MethodsAJAX();
        this.userLogEmail = false;
        this.checkIsUserRegistered();
    }

    /**
     * check is user registered
     */
    checkIsUserRegistered() {
        if (localStorage.getItem('userLogEmail') != null) {
            this.userLogEmail = JSON.parse(localStorage.getItem('userLogEmail'));
            this.emit('userIsRegistered', this.userLogEmail);
        }
    }

    /**
     * Get an array objects of the server. Checking if there is an object
     * with such email. If true - there will be a validation error event
     * @param userObj - this is user data from the form
     * @returns { Promise}
     */
    checkIsTakenEmail(userObj) {
        return this.methodsAJAX.getDataFetch('http://localhost:3006/login')
            .then((allUserObj) => {
                for (let i = 0; i < allUserObj.length; i++) {
                    if (allUserObj[i].email === userObj.email) {
                        userObj.email = false;
                        this.emit('emailIsTaken', userObj);
                        break;
                    }
                }
            })
            .catch(err => console.log(err));
    }

    /**
     * Get an array objects of the server.
     * Checking if there is an object with such email.
     * If there is not - add user to array of objects on server
     * @param userObj -- this is user data from the form
     */
    signUp(userObj) {
        this.checkIsTakenEmail(userObj)
            .then(() => {

                if (userObj.email !== false) {
                    this.addNewUser(userObj);
                }
            })
            .catch(err => console.log(err));
    }

    /**
     * Add user to array of objects on server and LocalStorage
     * @param userObj -- this is user data from the form
     */
    addNewUser(userObj) {
        this.methodsAJAX.sendData('http://localhost:3006/login', userObj)
            .then(() => {

                this.userIsAuthorized(userObj);
            })
            .catch(err => console.log(err));
    }

    /**
     * Get an array objects of the server. Checking if there is this object.
     * @param userObj -- this is user data from the form
     */
    signIn(userObj) {
        this.methodsAJAX.getDataFetch('http://localhost:3006/login')
            .then((allUserObj) => {

                for (let i = 0; i < allUserObj.length; i++) {
                    if (allUserObj[i].userName === userObj.userName
                        && allUserObj[i].pass === userObj.pass
                        && allUserObj[i].email === userObj.email) {
                        this.userIsAuthorized(allUserObj[i]);
                        break;
                    }
                }
            })
            .catch(err => console.log(err));
    }

    /**
     * add the user to the Local Storage.
     * @param userObj
     */
    userIsAuthorized(userObj) {
        this.loginOut();
        this.userLogEmail = userObj.email;
        localStorage.setItem('userLogEmail', JSON.stringify(userObj.email));
        this.checkIsUserRegistered();
        this.emit('goToCart');
    }

    /**
     * make login Out
     */
    loginOut() {
        this.userLogEmail = false;
        localStorage.removeItem('cart');
        localStorage.removeItem('userLogEmail');
    }

}


