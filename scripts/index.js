const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

let formElement = popupElement.querySelector('.form');
let nameInput  = popupElement.querySelector('.form__item_type_name');
let aboutInput = popupElement.querySelector('.form__item_type_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//функция закрытия popup
const togglePopupClose = function() {
    popupElement.classList.toggle('popup_is-opened');
}

//функция открытия popup
const togglePopupOpen = function() {
    popupElement.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInputValue  = nameInput.value;
    const aboutInputValue  = aboutInput.value;

    profileName.textContent = nameInputValue;
    profileAbout.textContent = aboutInputValue;

    togglePopupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButtonElement.addEventListener('click', togglePopupOpen);
popupCloseButtonElement.addEventListener('click', togglePopupClose);


