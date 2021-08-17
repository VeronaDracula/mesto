export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown',  this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close(evt.currentTarget);
        }
    }

    setEventListeners() {
        const popupCloseButtonElement = this._popup.querySelector('.popup__close');
        popupCloseButtonElement.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
    }
}