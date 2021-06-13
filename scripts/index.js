const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');

const togglePopupVisibility = function() {
    popupElement.classList.toggle('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility);
popupCloseButtonElement.addEventListener('click', togglePopupVisibility);

let formElement = popupElement.querySelector('.form');
let nameInput  = popupElement.querySelector('.form__item_name');
let aboutInput = popupElement.querySelector('.form__item_about');

console.log(formElement);


function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInputValue  = nameInput.value;
    const aboutInputValue  = aboutInput.value;

    const profileName = document.querySelector('.profile__name');
    const profileAbout = document.querySelector('.profile__about');

    profileName.textContent = `${nameInputValue}`;
    profileAbout.textContent = `${aboutInputValue}`;
}

formElement.addEventListener('submit', formSubmitHandler);
popupSaveButtonElement.addEventListener('click', togglePopupVisibility);

