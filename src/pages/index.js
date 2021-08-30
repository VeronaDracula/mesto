import './index.css';

import {dataClasses} from '../utils/constants.js'
import {Api} from '../components/Api.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupVerification} from '../components/PopupVerification.js'
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


//элементы popup_type_edit-avatar
const popupEditAvatarOpenButtonElement = document.querySelector('.profile__avatar-hover');
const popupEditAvatarElement = document.querySelector('.popup_type_edit-avatar');
const formEditAvatarElement = popupEditAvatarElement.querySelector('.form');


//объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
const profileSelectors = {
    name: '.profile__name',
    about: '.profile__about',
    avatar: '.profile__avatar'
}



const profileInfo = new UserInfo(profileSelectors);

//добавление аватара
function submitEditAvatarForm (data) {
    popupEditAvatarForm.renderLoading(true);

    api.createNewUserAvatarApi(data)
        .then(data => {
            profileInfo.setUserAvatar(data.avatar);
            popupEditAvatarForm.close();
        })
        .catch(err => console.log(err))

        .finally(() => {
            popupEditAvatarForm.renderLoading(false);
        });
}


// функция сохранения данных popup__profile
function submitEditProfileForm (data) {
    popupProfileForm.renderLoading(true);
    api.createNewUserInfoApi(data)
        .then(data => {
            profileInfo.setUserInfo(data.name, data.about);
            popupProfileForm.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupProfileForm.renderLoading(false);
        });
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
                .catch(err => console.log(err))
    })

}


//создание карточки
function createCard (data, template, handleCardClick, deleteCardClick, like, api, userData) {
    const card = new Card(data, template, handleCardClick, deleteCardClick, like, api, userData);
    return card.generateCard();
}


const url = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-27/'
}
const authorization = '8ab69193-abde-425d-8080-68fbeb2c2f47';


const api = new Api(url, authorization);

//добавление новой карточки на страницу и на сервер
function formPhotoSubmitHandler (data) {
    popupCardForm.renderLoading(true);
    api.createCardApi(data)
        .then(data => {
            cardsElement.prepend(createCard(data, '.card-template-with-delete', handleCardClick, deleteCardClick));
            popupCardForm.close();

            formCardElement.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupCardForm.renderLoading(false);
        });


}


//проверка наличия своего лайка
function searchLike (item, userData) {
    return item.likes.map(like => like._id).includes(userData._id);
}



api
    .getUserInfoApi()
    .then(userData => {
        //загрузка данных пользователя на страницу
        profileInfo.setUserInfo(userData.name, userData.about);
        profileInfo.setUserAvatar(userData.avatar);

        //создание секции
        api
            .getCards()
            .then(data => {
                const cardList = new Section({
                    items: data,
                    renderer: (item) => {

                        const like = searchLike (item, userData);

                       if(item.owner._id === userData._id) {
                            cardList.addItem(createCard(item, '.card-template-with-delete', handleCardClick, deleteCardClick, like, api, userData));
                        }
                        else{
                            cardList.addItem(createCard(item, '.card-template', handleCardClick, deleteCardClick, like, api, userData));
                        }

                    }
                }, '.cards');
                cardList.renderItems();
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))




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














