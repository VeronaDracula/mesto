import {Popup} from './Popup.js'

export class PopupWithForm extends Popup  {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;

        this._submitButton = this._popup.querySelector('.form__save');
        this._submitButtonLabel = this._submitButton.textContent
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__item');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit',  (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = 'Сохранение...';
            this._submitButton.setAttribute('disabled', true);
        }

        else{
            this._submitButton.textContent = this._submitButtonLabel;
            this._submitButton.removeAttribute('disabled');
        }
    }
}