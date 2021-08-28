import './index.css';

import {dataClasses} from '../utils/constants.js'
import {Api} from '../components/Api.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {Popup} from '../components/Popup.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {UserAvatar} from '../components/UserAvatar.js'
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
const popupDeleteCardElement = popupDelete.querySelector('.form__save');


//элементы popup_type_edit-avatar
const popupEditAvatarOpenButtonElement = document.querySelector('.profile__avatar-hover');
const popupEditAvatarElement = document.querySelector('.popup_type_edit-avatar');
const formEditAvatarElement = popupEditAvatarElement.querySelector('.form');


//объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
const profileSelectors = {
    name: '.profile__name',
    about: '.profile__about'
}

const profileAvatar = new UserAvatar('.profile__avatar')

//добавление аватара
function submitEditAvatarForm (data) {
    profileAvatar.setUserAvatar(data.link)

    popupEditAvatarForm.close();
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
function deleteCardClick(card, cardId) {
    popupDeleteCard.open();

    /*popupDeleteCardElement.addEventListener('click', () => {
        popupDeleteCard.close();
        card.remove();
    });*/

    popupDeleteCardElement.addEventListener('click', () => {
        popupDeleteCard.close();
        api.deleteCardApi(cardId)
            .then(() => {
                card.remove();
            })
    });
}

//создание карточки
function createCard (data, template, handleCardClick, deleteCardClick) {
    const card = new Card(data, template, handleCardClick, deleteCardClick);
    return card.generateCard();
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-27/cards'
})

//добавление новой карточки на страницу и на сервер
function formPhotoSubmitHandler (data) {
    api.createCardApi(data)
        .then(data => {
            console.log(data);
            cardsElement.prepend(createCard(data, '.card-template-with-delete', handleCardClick, deleteCardClick));
        })

    popupCardForm.close();

    formCardElement.reset();
}

//создание секции
api
    .getCards()
    .then(data => {
        const cardList = new Section({
            items: data,
            renderer: (item) => {
                cardList.addItem(createCard(item, '.card-template', handleCardClick, deleteCardClick));
            }
        }, '.cards');
        cardList.renderItems();
    })



//запуск валидации
const formValidatorProfile = new FormValidator(dataClasses, formEditProfile)
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(dataClasses, formCardElement)
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(dataClasses, formEditAvatarElement)
formValidatorAvatar.enableValidation();


const popupEditAvatarForm = new PopupWithForm('.popup_type_edit-avatar', submitEditAvatarForm);
const popupCardForm = new PopupWithForm('.popup_type_card', formPhotoSubmitHandler);
const popupProfileForm = new PopupWithForm('.popup_type_profile', submitEditProfileForm);

popupEditAvatarForm.setEventListeners();
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

popupEditAvatarOpenButtonElement.addEventListener('click', () => {
    popupEditAvatarForm.open();
    formValidatorAvatar.resetValidation();
});














