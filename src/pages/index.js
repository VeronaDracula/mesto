import './index.css';

import {initialCards} from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {FormValidator, dataClasses} from '../components/FormValidator.js'


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
const photoNameInput  = popupCardElement.querySelector('.form__item_type_photo-name');
const linkInput = popupCardElement.querySelector('.form__item_type_link');

//объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
const ProfileSelectors = {
    name: '.profile__name',
    about: '.profile__about'
}



const ProfileInfo = new UserInfo(ProfileSelectors);
//загрузка данных пользователя в форму
ProfileInfo.getUserInfo();
nameInput.value = ProfileInfo.getUserInfo().name;
aboutInput.value = ProfileInfo.getUserInfo().about;

// функция сохранения данных popup__profile
function submitEditProfileForm (evt) {
    evt.preventDefault();

    ProfileInfo.setUserInfo(nameInput.value, aboutInput.value);

    popupProfileForm.close();
}

//устанавливаем данные для popup_photo
function handleCardClick(name, link) {
    const popupImage = new PopupWithImage('.popup_type_photo', name, link);
    popupImage.open();
    popupImage.setEventListeners();
}

//создание карточки
function createCard (link, name, template, handleCardClick) {
    const card = new Card(link, name, template, handleCardClick);
    return card.generateCard();
}

//добавление новой карточки на страницу
function formPhotoSubmitHandler (evt) {
    evt.preventDefault();

    cardsElement.prepend(createCard(photoNameInput.value, linkInput.value, '.card-template', handleCardClick));

    popupCardForm.close();

    formCardElement.reset();
}


//запуск валидации
const formValidatorProfile = new FormValidator(dataClasses, formEditProfile)
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(dataClasses, formCardElement)
formValidatorCard.enableValidation();


//создание секции
const CardList = new Section({
    items: initialCards,
    renderer: (item) => {
        CardList.addItem(createCard(item.name, item.link, '.card-template', handleCardClick));
    }
}, '.cards');

CardList.renderItems();



const popupCardForm = new PopupWithForm('.popup_type_card', formPhotoSubmitHandler);
const popupProfileForm = new PopupWithForm('.popup_type_profile', submitEditProfileForm);

popupCardForm.setEventListeners();
popupProfileForm.setEventListeners();



popupProfileOpenButtonElement.addEventListener('click', () => {
    popupProfileForm.open();
    formValidatorProfile.resetValidation();
});

popupCardOpenButtonElement.addEventListener('click', () => {
    popupCardForm.open();
    formValidatorCard.resetValidation();
});
















