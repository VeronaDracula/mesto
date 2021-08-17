export {FormValidator};

class FormValidator {
    _formElement
    _formSelector
    _inputSelector
    _submitButtonSelector
    _inactiveButtonClass
    _inputErrorClass
    _errorClass
    _buttonElement
    _inputList

    constructor(dataClasses, formElement) {
        this._formElement = formElement;
        this._formSelector = dataClasses.formSelector;
        this._inputSelector = dataClasses.inputSelector;
        this._submitButtonSelector = dataClasses.submitButtonSelector;
        this._inactiveButtonClass = dataClasses.inactiveButtonClass;
        this._inputErrorClass = dataClasses.inputErrorClass;
        this._errorClass = dataClasses.errorClass;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    // показывать ошибку
    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //убирать ошибку
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    //проверка валидности
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid){

            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    //статус кнопки
    _toggleButtonState () {
        const hasNotValidInput = this._inputList.some(
            (inputElement) => !inputElement.validity.valid
        )
        if (hasNotValidInput) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        }
        else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListener () {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            };

            inputElement.addEventListener("input", handleInput);
        };

        this._inputList.forEach(inputListIterator);

        this._toggleButtonState();
    }

    resetValidation () {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    enableValidation () {
        this._setEventListener()
    }
}



