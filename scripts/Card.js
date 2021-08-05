//создание карточки

export class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
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

        this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
            evt.target.closest('.card').remove();
        });
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like_active');
        });
        cardImageElement.addEventListener('click', (event) => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
