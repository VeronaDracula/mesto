import {Popup} from './Popup.js'

export class PopupWithForm extends Popup  {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const nameInput  = this._popup.querySelector('.form__item_type_name');
        const aboutInput = this._popup.querySelector('.form__item_type_about');

        const nameInputValue  = nameInput.value;
        const aboutInputValue  = aboutInput.value;
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