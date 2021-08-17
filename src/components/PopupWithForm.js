import {Popup} from './Popup.js'

export class PopupWithForm extends Popup  {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const popupFormsData = Array.from(this._popup.querySelectorAll('.form__item'));
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', this._submitForm);
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}