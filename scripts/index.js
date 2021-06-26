//элементы popup__profile
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');

const popupProfileElement = document.querySelector('.popup');
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');

let formElement = popupProfileElement.querySelector('.form');
let nameInput  = popupProfileElement.querySelector('.form__item_type_name');
let aboutInput = popupProfileElement.querySelector('.form__item_type_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//элементы popup__card
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');

const popupCardElement = document.querySelector('.popup__card');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close');

const cardTemplateContent = document.querySelector('.card-template').content;
const cardsElement = document.querySelector('.cards');
const formCardElement = popupCardElement.querySelector('.form');
const photoNameInput  = popupCardElement.querySelector('.form__item_type_photo-name');
const linkInput = popupCardElement.querySelector('.form__item_type_link');

const cardElement = cardTemplateContent.cloneNode(true);
const cardTitleElement = cardElement.querySelector('.card__title');
const cardImageElement = cardElement.querySelector('.card__image');


// элементы popup-photo
const popupPhotoElement = document.querySelector('.popup__photo');
const imageElement = popupPhotoElement.querySelector('.popup-photo__image');
const imageTitleElement = popupPhotoElement.querySelector('.popup-photo__title');
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup-photo__close');


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
const togglePopupCardOpen = function() {
    popupCardElement.classList.toggle('popup_is-opened');
}
//функция закрытия popup__photo
const togglePopupCardClose = function() {
    popupCardElement.classList.toggle('popup_is-opened');
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

//удаление карточки
function handleDelete(event) {
    event.target.closest('.card').remove();
}

//ставим лайк
function handleLike(event) {
    event.target.classList.toggle('card__like_active');
}

//функция открытия popup__photo
function togglePopupPhotoOpen(event) {
    popupPhotoElement.classList.toggle('popup_is-opened');

    imageElement.setAttribute('src', event.target.getAttribute('src'));
    imageTitleElement.textContent = event.target.getAttribute('alt');
}
//закрытие popup__photo
const togglePopupPhotoClose = function() {
    popupPhotoElement.classList.toggle('popup_is-opened');
}


//обработчик для кнопок внутри карточек
function setEventListeners(cardElement) {
    cardElement.querySelector('.card__delete').addEventListener('click', handleDelete);
    cardElement.querySelector('.card__like').addEventListener('click', handleLike);
    cardElement.querySelector('.card__image').addEventListener('click', togglePopupPhotoOpen);
}


//загузка карточек
function renderCard(title, image) {
    const cardElement = cardTemplateContent.cloneNode(true);
    const cardTitleElement = cardElement.querySelector('.card__title');
    const cardImageElement = cardElement.querySelector('.card__image');

    cardImageElement.setAttribute('src', image);
    cardImageElement.setAttribute('alt', title);
    cardTitleElement.textContent = title;

    setEventListeners(cardElement);

    cardsElement.appendChild(cardElement);
}

//добавдение данных из массива в карточки
function renderCards(cards) {
    cards.forEach(function (card) {
            renderCard(card['name'], card['link']);
        }
    );
}

renderCards(initialCards);





//добавление новой карточки на страницу
function formPhotoSubmitHandler (evt) {
    evt.preventDefault();

    cardTitleElement.textContent = photoNameInput.value;
    cardImageElement.setAttribute('src', linkInput.value);
    console.log(linkInput.value);

    cardsElement.prepend(cardElement);

    togglePopupCardClose();
}



formElement.addEventListener('submit', formSubmitHandler);
popupProfileOpenButtonElement.addEventListener('click', togglePopupOpen);
popupProfileCloseButtonElement.addEventListener('click', togglePopupClose);

formCardElement.addEventListener('submit', formPhotoSubmitHandler);
popupCardOpenButtonElement.addEventListener('click', togglePopupCardOpen);
popupCardCloseButtonElement.addEventListener('click', togglePopupCardClose);

popupPhotoCloseButtonElement.addEventListener('click', togglePopupPhotoClose);




