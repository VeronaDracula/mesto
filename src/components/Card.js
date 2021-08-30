//создание карточки

export class Card {
    constructor(data, cardSelector, handleCardClick, deleteCardClick, handleCardLikeClick, like) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._deleteCardClick = deleteCardClick;
        this._handleCardClick = handleCardClick;

        this._handleCardLikeClick = handleCardLikeClick;

        this._like = like;
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
        const cardLikesElement = this._element.querySelector('.card__like-amount');

        if(this._like === true) {
            this._element.querySelector('.card__like').classList.add('card__like_active');
        }

        cardLikesElement.textContent = this._likes.length;
        cardImageElement.setAttribute('src', this._link);
        cardImageElement.setAttribute('alt', this._name);
        cardTitleElement.textContent = this._name;

        return this._element
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
            this._handleCardLikeClick(this._element, this._id);
        });

        cardImageElement.addEventListener('click', (event) => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
