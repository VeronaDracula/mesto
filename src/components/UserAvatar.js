//класс работает с аватаром профайла
export class UserAvatar {
    constructor(linkSelector) {
        this._linkSelector = linkSelector;
        console.log(this._linkSelector)

        this._avatarImage = document.querySelector(this._linkSelector);
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserAvatar(linkInput) {
        this._avatarImage.setAttribute('src', linkInput);
    }
}
