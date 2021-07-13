// показывать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

//убирать ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__item_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
};

//проверка валидности
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
};

// статус кнопки
const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    )
     if (hasNotValidInput) {
         buttonElement.setAttribute('disabled', true);
         buttonElement.classList.add('form__save_inactive');
     }
     else {
         buttonElement.removeAttribute('disabled');
         buttonElement.classList.remove('form__save_inactive');
     }

}

const setEventListener = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.form__item'));
    const buttonElement = formElement.querySelector('.form__save');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    toggleButtonState(inputList, buttonElement);
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach(setEventListener);
};

enableValidation();