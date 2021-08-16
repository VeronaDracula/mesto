//класс работает с данными профайла
export class UserInfo {
    constructor(Selectors) {
        this._nameSelector = Selectors.name;
        this._aboutSelector = Selectors.about;

    }
    //возвращает объект с данными пользователя
    getUserInfo() {
        this._profileName = document.querySelector(this._nameSelector);
        this._profileAbout = document.querySelector(this._aboutSelector);

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
}