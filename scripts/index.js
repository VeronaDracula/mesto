import {initialCards} from './initial-cards.js'
import {Card} from './Card.js'
import {Section} from './Section.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'
/*import {closePopup, closePopupByClickOverlay, openPopup} from './open-closePopup.js'*/
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
const imageElement = popupPhotoElement.querySelector('.popup-photo__image');
const imageTitleElement = popupPhotoElement.querySelector('.popup-photo__title');




/*
//загрузка данных в input popup-profile
const loadProfileData = function () {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}
*/


const ProfileInfo = new UserInfo('.profile__name', '.profile__about');

ProfileInfo.getUserInfo();
nameInput.value = ProfileInfo.getUserInfo().name;
aboutInput.value = ProfileInfo.getUserInfo().about;

// функция сохранения данных popup__profile
function submitEditProfileForm (evt) {
    evt.preventDefault();

    ProfileInfo.setUserInfo(nameInput.value, aboutInput.value);

    /*const nameInputValue  = nameInput.value;
    const aboutInputValue  = aboutInput.value;

    profileName.textContent = nameInputValue;
    profileAbout.textContent = aboutInputValue;*/

    popupProfileForm.close();
}

//устанавливаем данные для popup_photo
function handleCardClick(name, link) {
    /*imageElement.setAttribute('src', link);
    imageElement.setAttribute('alt', name);
    imageTitleElement.textContent = name;
    openPopup(popupPhotoElement);*/
    const popupImage = new PopupWithImage('.popup_type_photo', name, link);
    popupImage.open();
    popupPhotoCloseButtonElement.addEventListener('click', () => popupImage.setEventListeners());
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

/*
//получение данных из коллекции
initialCards.forEach(function (initialCard) {
    const name = initialCard.name;
    const link = initialCard.link;

    addCard(cardsElement, createCard(name, link, '.card-template', handleCardClick));
})

//добавление карточек в контейнер
function addCard (container, cardElement){
    container.appendChild(cardElement);
}
*/

//запуск валидации
const formValidatorProfile = new FormValidator(dataClasses, formEditProfile)
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(dataClasses, formCardElement)
formValidatorCard.enableValidation();




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




/*formEditProfile.addEventListener('submit', submitEditProfileForm);*/
popupProfileOpenButtonElement.addEventListener('click', () => {
    popupProfileForm.open();
    /*loadProfileData();*/
    formValidatorProfile.resetValidation();
});

/*popupProfileCloseButtonElement.addEventListener('click', () => ProfileForm.close());*/

/*formCardElement.addEventListener('submit', formPhotoSubmitHandler);*/
popupCardOpenButtonElement.addEventListener('click', () => {
    popupCardForm.open();
    /*formCardElement.reset();*/
    formValidatorCard.resetValidation();
});

/*popupCardCloseButtonElement.addEventListener('click', () => popupCardForm.close());*/

/*popupPhotoCloseButtonElement.addEventListener('click', () => popupImage.close());*/

/*popupElements.forEach ((popupElement) => {
    popupElement.addEventListener('click', closePopupByClickOverlay);
});*/














