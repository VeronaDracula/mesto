
/*
// показывать ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//убирать ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

//проверка валидности
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid){

        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
    else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// статус кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    )
     if (hasNotValidInput) {
         buttonElement.setAttribute('disabled', true);
         buttonElement.classList.add(inactiveButtonClass);
     }
     else {
         buttonElement.removeAttribute('disabled');
         buttonElement.classList.remove(inactiveButtonClass);
     }

}

const setEventListener = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        };

        inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
});





//дизактивация кнопки 'Сохранить'
function disableSubmitButton(popup) {
    const saveButtonElement = popup.querySelector('.form__save');
    saveButtonElement.setAttribute('disabled', true);
    saveButtonElement.classList.add('form__save_inactive');
}


//удаление обозначений ошибок валидации
function clearValidationErrors (popup) {
    const errorTexts = Array.from(popup.querySelectorAll('.form__input-error'));
    errorTexts.forEach ((errorText) => {
        errorText.textContent = '';
        errorText.classList.remove('form__input-error_active');
    });

    const inputElements = Array.from(popup.querySelectorAll('.form__item'));
    inputElements.forEach ((inputElement) => {
        inputElement.classList.remove('form__item_type_error');
    });
}

*/

