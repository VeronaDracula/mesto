import {Popup} from './Popup.js'

export class PopupVerification extends Popup  {
    constructor(popupSelector) {
        super(popupSelector);
    }

   setFormSubmit(newFormSubmit) {
        this.formSubmit = newFormSubmit;
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit',  (evt) => {
            evt.preventDefault()
            this.formSubmit()
        });
        super.setEventListeners();
    }
}