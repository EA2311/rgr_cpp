export class MethodsAJAX {
    constructor() {
    }

    thenCopyPathFunc() {
        return (response) => {
            if (response.ok) {
                return response.statusText;
            }
            throw new Error(`Bad HTTP stuff..`);
        };
    }

    getDataFetch(url) {
        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Bad HTTP stuff..`);
            })
            .catch((e) => e);
    }

    sendData(url, data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'}),
        };
        return fetch(url, options)
            .then(this.thenCopyPathFunc());
    }

    deleteData(url, id) {
        const options = {
            method: 'DELETE',
        };
        return fetch(`${url}/${id}`, options)
            .then(this.thenCopyPathFunc());
    }

    changePost(url, id, data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'}),
        };
        return fetch(`${url}/${id}`, options)
            .then(this.thenCopyPathFunc());
    }

}
