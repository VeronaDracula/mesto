//создание карточки

export class Card {
    constructor(data, cardSelector, handleCardClick, deleteCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._deleteCardClick = deleteCardClick;
        this._handleCardClick = handleCardClick;
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
            evt.target.classList.toggle('card__like_active');
        });
        cardImageElement.addEventListener('click', (event) => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
