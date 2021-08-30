import {Popup} from './Popup.js'

export class PopupWithForm extends Popup  {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;

        this._submitButtonLabel = this._popup.querySelector('.form__save').textContent
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
            this._form.querySelector('.form__save').textContent = 'Сохранение...';
        }

        else{
            this._form.querySelector('.form__save').textContent = this._submitButtonLabel;
        }
    }
}