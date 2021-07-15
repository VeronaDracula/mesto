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

const cardTemplateContent = document.querySelector('.card-template').content;
const cardsElement = document.querySelector('.cards');
const formCardElement = popupCardElement.querySelector('.form');
const photoNameInput  = popupCardElement.querySelector('.form__item_type_photo-name');
const linkInput = popupCardElement.querySelector('.form__item_type_link');

// элементы popup-photo
const popupPhotoElement = document.querySelector('.popup_type_photo');
const imageElement = popupPhotoElement.querySelector('.popup-photo__image');
const imageTitleElement = popupPhotoElement.querySelector('.popup-photo__title');
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup-photo__close');



//функция закрытия popup
function closePopup (popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    formCardElement.reset();
}

// закрытие popup по Esc
function closeByEsc(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closePopup(popupIsOpened);
    }
}

//закрытие по overlay
function closePopupByClickOverlay(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.target === evt.currentTarget){
        closePopup(popupIsOpened);
    }
}

//функция открытия popup
function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

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


//удаление карточки
function handleDelete(event) {
    event.target.closest('.card').remove();
}

//ставим лайк
function handleLike(event) {
    event.target.classList.toggle('card__like_active');
}

//загрузка данных popup__photo
function loadPopupPhotoData(event) {
    imageElement.setAttribute('src', event.target.getAttribute('src'));
    imageElement.setAttribute('alt', event.target.getAttribute('alt'));
    imageTitleElement.textContent = event.target.getAttribute('alt');
}


//обработчик для кнопок внутри карточек
function setEventListeners(cardElement) {
    const cardImageElement = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__delete').addEventListener('click', handleDelete);
    cardElement.querySelector('.card__like').addEventListener('click', handleLike);
    cardImageElement.addEventListener('click', () => openPopup(popupPhotoElement));
    cardImageElement.addEventListener('click', loadPopupPhotoData);
}


//создание карточки
function renderCard(name, link) {
    const cardElement = cardTemplateContent.cloneNode(true);
    const cardTitleElement = cardElement.querySelector('.card__title');
    const cardImageElement = cardElement.querySelector('.card__image');

    cardImageElement.setAttribute('src', link);
    cardImageElement.setAttribute('alt', name);
    cardTitleElement.textContent = name;

    setEventListeners(cardElement);

    return cardElement;
}

//добавление карточек в контейнер
function addCard (container, cardElement){
    container.appendChild(cardElement);
}

//получение данных из коллекции
initialCards.forEach(function (initialCard) {
    const name = initialCard.name;
    const link = initialCard.link;
    const card = renderCard(name, link);

    addCard(cardsElement, card);
})

//добавление новой карточки на страницу
function formPhotoSubmitHandler (evt) {
    evt.preventDefault();

    cardsElement.prepend(renderCard(photoNameInput.value, linkInput.value));

    closePopup(popupCardElement);

    formCardElement.reset();
}



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
});
popupCardCloseButtonElement.addEventListener('click', () => closePopup(popupCardElement));

popupPhotoCloseButtonElement.addEventListener('click', () => closePopup(popupPhotoElement));

popupElements.forEach ((popupElement) => {
    popupElement.addEventListener('click', closePopupByClickOverlay);
});







