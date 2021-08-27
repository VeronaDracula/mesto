
export class Api {
    headers = {
        'Content-Type': 'application/json',
        authorization: '8ab69193-abde-425d-8080-68fbeb2c2f47'
    }
    constructor(config) {
        this.url = config.url;
    }

    getCards () {
        return fetch(this.url, {
            headers: this.headers,
            method: 'GET',
        }).then(response => {
            if (!response.ok) {
                return Promise
                    .reject({message: 'not ok'})
            }
            console.log(response)

            return response.json()
        })
            .catch(err => console.log(err))
    }

    createCard () {

    }

    deleteCard () {

    }
}