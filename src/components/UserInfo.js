//класс работает с данными профайла
export class UserInfo {
    constructor(selectors) {
        this._nameSelector = selectors.name;
        this._aboutSelector = selectors.about;
        this._avatarSelector = selectors.avatar;


        this._avatarImage = document.querySelector(this._avatarSelector);
        this._profileName = document.querySelector(this._nameSelector);
        this._profileAbout = document.querySelector(this._aboutSelector);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        };
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(nameInput, aboutInput) {
        this._profileName.textContent = nameInput;
        this._profileAbout.textContent = aboutInput;
    }

    setUserAvatar(linkInput) {
        this._avatarImage.setAttribute('src', linkInput);
    }
}