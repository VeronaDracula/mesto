//создание карточки

export class Card {
    constructor(data, cardSelector, handleCardClick, deleteCardClick, like, api, userData) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._deleteCardClick = deleteCardClick;
        this._handleCardClick = handleCardClick;
        this._like = like;
        this._api = api;

        this._userData = userData;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    //создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardTitleElement = this._element.querySelector('.card__title');
        const cardImageElement = this._element.querySelector('.card__image');
        this._cardLikesElement = this._element.querySelector('.card__like-amount');


        if(this._like === true) {
            this._element.querySelector('.card__like').classList.add('card__like_active');
        }

        this._cardLikesElement.textContent = this._likes.length;
        cardImageElement.setAttribute('src', this._link);
        cardImageElement.setAttribute('alt', this._name);
        cardTitleElement.textContent = this._name;

        return this._element
    }


    _cardLikeClick() {
        const cardLikeElement = this._element.querySelector('.card__like');

        if(!this._element.querySelector('.card__like_active')) {
            this._api
                .likeApi(this._id)
                .then(data => {
                    this._cardLikesElement.textContent = data.likes.length;
                    cardLikeElement.classList.add('card__like_active');

                    }
                )
                .catch(err => console.log(err))
        }
        else {
            this._api
                .deleteLikedApi(this._id)
                .then(()=> {
                    const index = this._likes.indexOf(this._userData);
                    this._likes.splice(index, 1);
                    console.log(this._likes);
                    this._cardLikesElement.textContent = this._likes.length;
                    cardLikeElement.classList.remove('card__like_active');
                })
                .catch(err => console.log(err))
        }
    }


    //обработчик для кнопок внутри карточки
    _setEventListeners() {
        const cardImageElement = this._element.querySelector('.card__image');
        const cardDeleteButton = this._element.querySelector('.card__delete');

        if (cardDeleteButton) {
            cardDeleteButton.addEventListener('click', () => {
                this._deleteCardClick(this._element, this._id);
            });
        }

        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._cardLikeClick();
        });

        cardImageElement.addEventListener('click', (event) => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
