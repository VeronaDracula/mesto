import './index.css';

import {initialCards, dataClasses} from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {Popup} from '../components/Popup.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {FormValidator} from '../components/FormValidator.js'


//элементы popup__profile
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');
const popupProfileElement = document.querySelector('.popup_type_profile');
const formEditProfile = popupProfileElement.querySelector('.form');
const nameInput  = popupProfileElement.querySelector('.form__item_type_name');
const aboutInput = popupProfileElement.querySelector('.form__item_type_about');

//элементы popup__card
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_type_card');
const cardsElement = document.querySelector('.cards');
const formCardElement = popupCardElement.querySelector('.form');

//элементы popup_type_delete
const popupDelete = document.querySelector('.popup_type_delete');
const popupDeleteCardOpenElement = document.querySelector('.card__delete');
const popupDeleteCardElement = popupDelete.querySelector('.form__save');



//объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
const profileSelectors = {
    name: '.profile__name',
    about: '.profile__about'
}



const profileInfo = new UserInfo(profileSelectors);

// функция сохранения данных popup__profile
function submitEditProfileForm (data) {
    profileInfo.setUserInfo(data.name, data.about);

    popupProfileForm.close();
}


const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

//устанавливаем данные для popup_photo
function handleCardClick(name, link) {
    popupImage.open(name, link);
}


const popupDeleteCard = new Popup('.popup_type_delete');
popupDeleteCard.setEventListeners();

//удачение карточки
function deleteCardClick(card) {
    popupDeleteCard.open();

    popupDeleteCardElement.addEventListener('click', () => {
        popupDeleteCard.close();
        card.remove();
    });
}

//создание карточки
function createCard (data, template, handleCardClick, deleteCardClick) {
    const card = new Card(data, template, handleCardClick, deleteCardClick);
    return card.generateCard();
}

//добавление новой карточки на страницу
function formPhotoSubmitHandler (data) {
    cardsElement.prepend(createCard(data, '.card-template-with-delete', handleCardClick, deleteCardClick));

    popupCardForm.close();

    formCardElement.reset();
}


//запуск валидации
const formValidatorProfile = new FormValidator(dataClasses, formEditProfile)
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(dataClasses, formCardElement)
formValidatorCard.enableValidation();


//создание секции
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item, '.card-template', handleCardClick, deleteCardClick));
    }
}, '.cards');

cardList.renderItems();



const popupCardForm = new PopupWithForm('.popup_type_card', formPhotoSubmitHandler);
const popupProfileForm = new PopupWithForm('.popup_type_profile', submitEditProfileForm);

popupCardForm.setEventListeners();
popupProfileForm.setEventListeners();


popupProfileOpenButtonElement.addEventListener('click', () => {
    const profileData = profileInfo.getUserInfo()
    nameInput.value = profileData.name;
    aboutInput.value = profileData.about;
    popupProfileForm.open();
    formValidatorProfile.resetValidation();
});

popupCardOpenButtonElement.addEventListener('click', () => {
    popupCardForm.open();
    formValidatorCard.resetValidation();
});















