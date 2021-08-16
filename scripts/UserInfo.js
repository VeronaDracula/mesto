export class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
    }

    getUserInfo() {
        this._profileName = document.querySelector(this._nameSelector);
        this._profileAbout = document.querySelector(this._aboutSelector);

        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        };
    }

    setUserInfo(nameInput, aboutInput) {
        this._profileName.textContent = nameInput;
        this._profileAbout.textContent = aboutInput;
    }
}