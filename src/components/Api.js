
export class Api {
    headers = {
        'Content-Type': 'application/json',
        authorization: '8ab69193-abde-425d-8080-68fbeb2c2f47'
    }
    constructor(config) {
        this.urlCards = config.urlCards;
        this.urlUser = config.urlUser;
        this.urlUserNewInfo = config.urlUserNewInfo;
    }

    getCards () {
        return fetch(this.urlCards, {
            headers: this.headers
        }).then(response => {
            if (!response.ok) {
                return Promise
                    .reject({message: 'not ok'})
            }
            return response.json()
        })
            .catch(err => console.log(err))
    }

    createCardApi (data) {
        return fetch(this.urlCards, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject("Произошла ошибка")
        })
            .catch(err => console.log(err))
    }

    deleteCardApi (_id) {
        return fetch(this.urlCards + '/' + _id, {
            headers: this.headers,
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject("Произошла ошибка")
        })
            .catch(err => console.log(err))
    }

    getUserInfoApi () {
        return fetch(this.urlUser, {
            headers: this.headers
        }).then(response => {
            if (!response.ok) {
                return Promise
                    .reject({message: 'not ok'})
            }
            return response.json()
        })
            .catch(err => console.log(err))
    }

    createNewUserInfoApi (data) {
        return fetch(this.urlUserNewInfo, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject("Произошла ошибка")
        })
            .catch(err => console.log(err))
    }
}