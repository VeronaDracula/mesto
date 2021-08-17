import {Popup} from './Popup.js'

export class PopupWithImage extends Popup  {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupImage = this._popup.querySelector('.popup-photo__image');
        this._popupTitle = this._popup.querySelector('.popup-photo__title');
    }

    open = (name, link) => {
        this._popupImage.setAttribute('src', link);
        this._popupImage.setAttribute('alt', name);
        this._popupTitle.textContent = name;
        super.open();
    }
}