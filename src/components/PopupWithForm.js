import {Popup} from './Popup.js'

export class PopupWithForm extends Popup  {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__item');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}