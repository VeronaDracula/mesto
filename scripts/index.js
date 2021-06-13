const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');

const togglePopupVisibility = function() {
    popupElement.classList.toggle('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility);
popupCloseButtonElement.addEventListener('click', togglePopupVisibility);


