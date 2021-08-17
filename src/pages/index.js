import './index.css';

import {initialCards, dataClasses} from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
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

//создание карточки
function createCard (data, template, handleCardClick) {
    const card = new Card(data, template, handleCardClick);
    return card.generateCard();
}

//добавление новой карточки на страницу
function formPhotoSubmitHandler (data) {
    cardsElement.prepend(createCard(data, '.card-template', handleCardClick));

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
        cardList.addItem(createCard(item, '.card-template', handleCardClick));
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
















