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
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup__close');



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

//создание карточки
function createCard (link, name, template) {
    const card = new Card(link, name, template);
    return card.generateCard();
}

//добавление новой карточки на страницу
function formPhotoSubmitHandler (evt) {
    evt.preventDefault();

    cardsElement.prepend(createCard(photoNameInput.value, linkInput.value, '.card-template'));

    closePopup(popupCardElement);

    formCardElement.reset();
}

//получение данных из коллекции
initialCards.forEach(function (initialCard) {
    const name = initialCard.name;
    const link = initialCard.link;

    addCard(cardsElement, createCard(name, link, '.card-template'));
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














