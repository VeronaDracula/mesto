import './index.css';

import {dataClasses} from '../utils/constants.js'
import {Api} from '../components/Api.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupVerification} from '../components/PopupVerification.js'
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
    popupEditAvatarForm.renderLoading(true);

    api.createNewUserAvatarApi(data)
        .then(data => {
            profileAvatar.setUserAvatar(data.avatar);
        })
        .finally(() => {
            popupEditAvatarForm.renderLoading(false);
        });

    popupEditAvatarForm.close();
}

const profileInfo = new UserInfo(profileSelectors);

// функция сохранения данных popup__profile
function submitEditProfileForm (data) {
    popupProfileForm.renderLoading(true);
    api.createNewUserInfoApi(data)
        .then(data => {
            profileInfo.setUserInfo(data.name, data.about);
        })
        .finally(() => {
            popupProfileForm.renderLoading(false);
        });

    popupProfileForm.close();
}


const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

//устанавливаем данные для popup_photo
function handleCardClick(name, link) {
    popupImage.open(name, link);
}

const popupDeleteCard = new PopupVerification('.popup_type_delete');
popupDeleteCard.setEventListeners();

//удаление карточки
function deleteCardClick(card, cardId) {
    popupDeleteCard.open();

    popupDeleteCard.setFormSubmit(
        () => {
            popupDeleteCard.close();
            api.deleteCardApi(cardId)
                .then(() => {
                    card.remove();
                })
    })

}

//ставим и убираем лайк
function handleCardLikeClick(card, cardId) {
    const amountCardElement = card.querySelector('.card__like-amount');
    const cardLikeElement = card.querySelector('.card__like');

    if(!card.querySelector('.card__like_active')) {
        api
            .likeApi(cardId)
            .then(data => {
                amountCardElement.textContent = data.likes.length;
                cardLikeElement.classList.toggle('card__like_active');

                }
            )
    }
    else {
        api
            .deleteLikedApi(cardId)
            .then(()=> {
                const likeAmount = amountCardElement.textContent - 1;
                amountCardElement.textContent = `${likeAmount}`;
                cardLikeElement.classList.toggle('card__like_active');
            })
    }
}

//создание карточки
function createCard (data, template, handleCardClick, deleteCardClick, handleCardLikeClick, like) {
    const card = new Card(data, template, handleCardClick, deleteCardClick, handleCardLikeClick, like);
    return card.generateCard();
}


//объект с адресами для запросов
const url = {
    urlCards: 'https://mesto.nomoreparties.co/v1/cohort-27/cards',
    urlUser: 'https://nomoreparties.co/v1/cohort-27/users/me',
    urlUserNewInfo: 'https://mesto.nomoreparties.co/v1/cohort-27/users/me',
    urlUserAvatar: 'https://mesto.nomoreparties.co/v1/cohort-27/users/me/avatar',
    urlLike: 'https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/'
}


const api = new Api(url);

//добавление новой карточки на страницу и на сервер
function formPhotoSubmitHandler (data) {
    popupCardForm.renderLoading(true);
    api.createCardApi(data)
        .then(data => {
            cardsElement.prepend(createCard(data, '.card-template-with-delete', handleCardClick, deleteCardClick, handleCardLikeClick));
        })
        .finally(() => {
            popupCardForm.renderLoading(false);
        });

    popupCardForm.close();

    formCardElement.reset();
}


//проверка наличия своего лайка
function searchLike (item, userData) {
    return item.likes.map(like => like._id).includes(userData._id);
}



api
    .getUserInfoApi()
    .then(userData => {
        //загрузка данных пользователя на страницу
        document.querySelector(profileSelectors.name).textContent = userData.name;
        document.querySelector(profileSelectors.about).textContent = userData.about;
        document.querySelector('.profile__avatar').setAttribute('src', userData.avatar);

        //создание секции
        api
            .getCards()
            .then(data => {
                const cardList = new Section({
                    items: data,
                    renderer: (item) => {

                        const like = searchLike (item, userData);

                       if(item.owner._id === userData._id) {
                            cardList.addItem(createCard(item, '.card-template-with-delete', handleCardClick, deleteCardClick, handleCardLikeClick, like));
                        }
                        else{
                            cardList.addItem(createCard(item, '.card-template', handleCardClick, deleteCardClick, handleCardLikeClick, like));
                        }

                    }
                }, '.cards');
                cardList.renderItems();
            })
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














