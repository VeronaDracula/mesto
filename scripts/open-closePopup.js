export {closePopup, closePopupByClickOverlay, openPopup}

//функция закрытия popup
function closePopup (popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

// закрытие popup по Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closePopup(popupIsOpened);
    }
}

//закрытие по overlay
function closePopupByClickOverlay(evt) {
    if (evt.target === evt.currentTarget){
        closePopup(evt.currentTarget);
    }
}

//функция открытия popup
function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

