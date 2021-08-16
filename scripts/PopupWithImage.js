import {Popup} from './Popup.js'

export class PopupWithImage extends Popup  {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open = () => {
        this._popupImage = this._popup.querySelector('.popup-photo__image');
        this._popupTitle = this._popup.querySelector('.popup-photo__title');
        this._popupImage.setAttribute('src', this._link);
        this._popupImage.setAttribute('alt', this._name);
        this._popupTitle.textContent = this._name;
        super.open();
    }
}