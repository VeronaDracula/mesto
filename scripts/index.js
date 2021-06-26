//элементы popup__profile
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');

const popupProfileElement = document.querySelector('.popup');
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');

let formElement = popupProfileElement.querySelector('.form');
let nameInput  = popupProfileElement.querySelector('.form__item_type_name');
let aboutInput = popupProfileElement.querySelector('.form__item_type_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//элементы popup__photo
const popupPhotoOpenButtonElement = document.querySelector('.profile__add-button');

const popupPhotoElement = document.querySelector('.popup__photo');
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup__close');

//let photoNameInput  = popupElement.querySelector('.form__item_type_photo-name');
//let linkInput = popupElement.querySelector('.form__item_type_link');
//const photoName = document.querySelector('.card__title');
//const linkPhoto = document.querySelector('img').getAttribute('src');

//функция закрытия popup__profile
const togglePopupClose = function() {
    popupProfileElement.classList.toggle('popup_is-opened');
}

//функция открытия popup__profile
const togglePopupOpen = function() {
    popupProfileElement.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

//функция открытия popup__photo
const togglePopupPhotoOpen = function() {
    popupPhotoElement.classList.toggle('popup_is-opened');
}
//функция закрытия popup__photo
const togglePopupPhotoClose = function() {
    popupPhotoElement.classList.toggle('popup_is-opened');
}


// функция сохранения данных popup__profile
function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInputValue  = nameInput.value;
    const aboutInputValue  = aboutInput.value;

    profileName.textContent = nameInputValue;
    profileAbout.textContent = aboutInputValue;

    togglePopupClose();
}


//массав начальных карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];





const cardTemplateContent = document.querySelector('.card-template').content;
const cardsElement = document.querySelector('.cards');
const formPhotoElement = popupPhotoElement.querySelector('.form');
const formPhotoSubmitElement = popupPhotoElement.querySelector('.form__save');
const photoNameInput  = popupPhotoElement.querySelector('.form__item_type_photo-name');
const linkInput = popupPhotoElement.querySelector('.form__item_type_link');


//загузка карточек
function renderCard(text, image) {
    const cardElement = cardTemplateContent.cloneNode(true);
    const cardTitleElement = cardElement.querySelector('.card__title');

    const cardImageElement = cardElement.querySelector('.card__image');
    cardImageElement.setAttribute('src', image);

    cardTitleElement.textContent = text;

    cardsElement.appendChild(cardElement);
}

function renderCards(cards) {
    cards.forEach(function (card) {
        renderCard(card['name'], card['link']);
        }
    );
}

renderCards(initialCards);





















formElement.addEventListener('submit', formSubmitHandler);
popupProfileOpenButtonElement.addEventListener('click', togglePopupOpen);
popupProfileCloseButtonElement.addEventListener('click', togglePopupClose);

popupPhotoOpenButtonElement.addEventListener('click', togglePopupPhotoOpen);
popupPhotoCloseButtonElement.addEventListener('click', togglePopupPhotoClose);









