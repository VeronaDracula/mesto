//класс работает с аватаром профайла
export class UserAvatar {
    constructor(avatarSelector) {
        this._avatarSelector = avatarSelector;
        this._avatarImage = document.querySelector(this._avatarSelector);
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserAvatar(linkInput) {
        this._avatarImage.setAttribute('src', linkInput);
    }
}
