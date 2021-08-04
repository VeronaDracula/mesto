import {initialCards} from './initial-cards.js'
import {Card} from './Card.js'
import {closePopup, closePopupByClickOverlay, openPopup} from './open-closePopup.js'
import {FormValidator, dataClasses} from './FormValidator.js'


const popupElements = Array.from(document.querySelectorAll('.popup'));

//элементы popup__profile
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');

const popupProfileElement = document.querySelector('.popup_type_profile');
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');

const formEditProfile = popupProfileElement.querySelector('.form');
const nameInput  = popupProfileElement.querySelector('.form__item_type_name');
const aboutInput = popupProfileElement.querySelector('.form__item_type_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//элементы popup__card
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');

const popupCardElement = document.querySelector('.popup_type_card');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close');


const cardsElement = document.querySelector('.cards');
const formCardElement = popupCardElement.querySelector('.form');
const photoNameInput  = popupCardElement.querySelector('.form__item_type_photo-name');
const linkInput = popupCardElement.querySelector('.form__item_type_link');

// элементы popup-photo
const popupPhotoElement = document.querySelector('.popup_type_photo');
const imageElement = popupPhotoElement.querySelector('.popup-photo__image');
const imageTitleElement = popupPhotoElement.querySelector('.popup-photo__title');
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup-photo__close');


/*
//функция закрытия popup
function closePopup (popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

// закрытие popup по Esc
function closeByEsc(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closePopup(popupIsOpened);
    }
}

//закрытие по overlay
function closePopupByClickOverlay(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.target === evt.currentTarget){
        closePopup(popupIsOpened);
    }
}

//функция открытия popup
function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

*/
//загрузка данных в input popup-profile
const loadProfileData = function () {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

// функция сохранения данных popup__profile
function submitEditProfileForm (evt) {
    evt.preventDefault();

    const nameInputValue  = nameInput.value;
    const aboutInputValue  = aboutInput.value;

    profileName.textContent = nameInputValue;
    profileAbout.textContent = aboutInputValue;

    closePopup(popupProfileElement);
}

//добавление новой карточки на страницу
function formPhotoSubmitHandler (evt) {
    evt.preventDefault();

    const card = new Card(photoNameInput.value, linkInput.value, '.card-template')

    cardsElement.prepend(card.generateCard());

    closePopup(popupCardElement);

    formCardElement.reset();
}

/*class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

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

    _setEventListeners() {
        const cardImageElement = this._element.querySelector('.card__image');

        this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
            evt.target.closest('.card').remove();
        });
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like_active');
        });
        cardImageElement.addEventListener('click', () => openPopup(popupPhotoElement));

        cardImageElement.addEventListener('click', (evt) => {
            imageElement.setAttribute('src', evt.target.getAttribute('src'));
            imageElement.setAttribute('alt', evt.target.getAttribute('alt'));
            imageTitleElement.textContent = evt.target.getAttribute('alt');

        });
    }
}*/

//получение данных из коллекции
initialCards.forEach(function (initialCard) {
    const name = initialCard.name;
    const link = initialCard.link;
    const card = new Card(name, link, '.card-template')

    addCard(cardsElement, card.generateCard());
})


//добавление карточек в контейнер
function addCard (container, cardElement){
    container.appendChild(cardElement);
}



//дизактивация кнопки 'Сохранить'
function disableSubmitButton(popup) {
    const saveButtonElement = popup.querySelector('.form__save');
    saveButtonElement.setAttribute('disabled', true);
    saveButtonElement.classList.add('form__save_inactive');
}


//удаление обозначений ошибок валидации
function clearValidationErrors (popup) {
    const errorTexts = Array.from(popup.querySelectorAll('.form__input-error'));
    errorTexts.forEach ((errorText) => {
        errorText.textContent = '';
        errorText.classList.remove('form__input-error_active');
    });

    const inputElements = Array.from(popup.querySelectorAll('.form__item'));
    inputElements.forEach ((inputElement) => {
        inputElement.classList.remove('form__item_type_error');
    });
}

//запуск валидации
const formList = Array.from(document.querySelectorAll(dataClasses.formSelector));

formList.forEach((formElement) => {
    const formValidator = new FormValidator(dataClasses, formElement)
    formValidator.enableValidation();
});



formEditProfile.addEventListener('submit', submitEditProfileForm);
popupProfileOpenButtonElement.addEventListener('click', () => {
    openPopup(popupProfileElement);
    loadProfileData();
    disableSubmitButton(popupProfileElement);
    clearValidationErrors(popupProfileElement);
});
popupProfileCloseButtonElement.addEventListener('click', () => closePopup(popupProfileElement));

formCardElement.addEventListener('submit', formPhotoSubmitHandler);
popupCardOpenButtonElement.addEventListener('click', () => {
    openPopup(popupCardElement);
    disableSubmitButton(popupCardElement);
    clearValidationErrors(popupCardElement);
    formCardElement.reset();
});
popupCardCloseButtonElement.addEventListener('click', () => closePopup(popupCardElement));

popupPhotoCloseButtonElement.addEventListener('click', () => closePopup(popupPhotoElement));

popupElements.forEach ((popupElement) => {
    popupElement.addEventListener('click', closePopupByClickOverlay);
});





/*const dataClasses = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
};

class FormValidator {
    _formElement
    _formSelector
    _inputSelector
    _submitButtonSelector
    _inactiveButtonClass
    _inputErrorClass
    _errorClass
    _buttonElement
    _inputList

    constructor(dataClasses, formElement) {
        this._formElement = formElement;
        this._formSelector = dataClasses.formSelector;
        this._inputSelector = dataClasses.inputSelector;
        this._submitButtonSelector = dataClasses.submitButtonSelector;
        this._inactiveButtonClass = dataClasses.inactiveButtonClass;
        this._inputErrorClass = dataClasses.inputErrorClass;
        this._errorClass = dataClasses.errorClass;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid){

            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState () {
        const hasNotValidInput = this._inputList.some(
            (inputElement) => !inputElement.validity.valid
        )
        if (hasNotValidInput) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        }
        else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListener () {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            };

            inputElement.addEventListener("input", handleInput);
        };

        this._inputList.forEach(inputListIterator);

        this._toggleButtonState();
    }

    enableValidation() {
        this._setEventListener()
    }
}
*/










