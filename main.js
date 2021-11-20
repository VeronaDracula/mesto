(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__save",inactiveButtonClass:"form__save_inactive",inputErrorClass:"form__item_type_error",errorClass:"form__input-error_active"};function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=t.url,this.authorization=n,this.headers={"Content-Type":"application/json",authorization:this.authorization}}var n,r;return n=e,(r=[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getCards",value:function(){var e=this;return fetch(this.url+"cards",{headers:this.headers}).then((function(t){return e._getResponseData(t)}))}},{key:"createCardApi",value:function(e){var t=this;return fetch(this.url+"cards",{headers:this.headers,method:"POST",body:JSON.stringify(e)}).then((function(e){return t._getResponseData(e)}))}},{key:"deleteCardApi",value:function(e){var t=this;return fetch(this.url+"cards/"+e,{headers:this.headers,method:"DELETE"}).then((function(e){return t._getResponseData(e)}))}},{key:"getUserInfoApi",value:function(){var e=this;return fetch(this.url+"users/me",{headers:this.headers}).then((function(t){return e._getResponseData(t)}))}},{key:"createNewUserInfoApi",value:function(e){var t=this;return fetch(this.url+"users/me",{headers:this.headers,method:"PATCH",body:JSON.stringify(e)}).then((function(e){return t._getResponseData(e)}))}},{key:"createNewUserAvatarApi",value:function(e){var t=this;return fetch(this.url+"users/me/avatar",{headers:this.headers,method:"PATCH",body:JSON.stringify(e)}).then((function(e){return t._getResponseData(e)}))}},{key:"likeApi",value:function(e){var t=this;return fetch(this.url+"cards/likes/"+e,{headers:this.headers,method:"PUT"}).then((function(e){return t._getResponseData(e)}))}},{key:"deleteLikedApi",value:function(e){var t=this;return fetch(this.url+"cards/likes/"+e,{headers:this.headers,method:"DELETE"}).then((function(e){return t._getResponseData(e)}))}}])&&t(n.prototype,r),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n,r,o,i,u,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._id=t._id,this._likes=t.likes,this._cardSelector=n,this._deleteCardClick=o,this._handleCardClick=r,this._like=u,this._api=i,this._userData=a}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){this._element=this._getTemplate(),this._setEventListeners();var e=this._element.querySelector(".card__title"),t=this._element.querySelector(".card__image");return this._cardLikesElement=this._element.querySelector(".card__like-amount"),!0===this._like&&this._element.querySelector(".card__like").classList.add("card__like_active"),this._cardLikesElement.textContent=this._likes.length,t.setAttribute("src",this._link),t.setAttribute("alt",this._name),e.textContent=this._name,this._element}},{key:"_cardLikeClick",value:function(){var e=this,t=this._element.querySelector(".card__like");this._element.querySelector(".card__like_active")?this._api.deleteLikedApi(this._id).then((function(){var n=e._likes.indexOf(e._userData);e._likes.splice(n,1),e._cardLikesElement.textContent=e._likes.length,t.classList.remove("card__like_active")})).catch((function(e){return console.log(e)})):this._api.likeApi(this._id).then((function(n){e._cardLikesElement.textContent=n.likes.length,t.classList.add("card__like_active")})).catch((function(e){return console.log(e)}))}},{key:"_setEventListeners",value:function(){var e=this,t=this._element.querySelector(".card__image"),n=this._element.querySelector(".card__delete");n&&n.addEventListener("click",(function(){e._deleteCardClick(e._element,e._id)})),this._element.querySelector(".card__like").addEventListener("click",(function(t){e._cardLikeClick()})),t.addEventListener("click",(function(t){e._handleCardClick(e._name,e._link)}))}}])&&r(t.prototype,n),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&i(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===e.currentTarget&&this.close(e.currentTarget)}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close").addEventListener("click",(function(){return e.close()})),this._popup.addEventListener("click",(function(t){return e._handleOverlayClose(t)}))}}])&&a(t.prototype,n),e}();function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function u(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),i.call(this,e)}return t=u,(n=[{key:"setFormSubmit",value:function(e){this.formSubmit=e}},{key:"setEventListeners",value:function(){var e=this;this._form=this._popup.querySelector(".form"),this._form.addEventListener("submit",(function(t){t.preventDefault(),e.formSubmit()})),f(_(u.prototype),"setEventListeners",this).call(this)}}])&&l(t.prototype,n),u}(s);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return b(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t,n){return(g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(o,e);var t,n,r=(t=o,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=k(t);if(n){var o=k(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return m(this,e)});function o(e){var t,n,i,u,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),a=function(e,r){n._popupImage.setAttribute("src",r),n._popupImage.setAttribute("alt",e),n._popupTitle.textContent=e,g((t=b(n),k(o.prototype)),"open",t).call(t)},(u="open")in(i=b(n=r.call(this,e)))?Object.defineProperty(i,u,{value:a,enumerable:!0,configurable:!0,writable:!0}):i.open=a,n._popupImage=n._popup.querySelector(".popup-photo__image"),n._popupTitle=n._popup.querySelector(".popup-photo__title"),n}return o}(s);function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t,n){return(C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitForm=t,n._submitButton=n._popup.querySelector(".form__save"),n._submitButtonLabel=n._submitButton.textContent,n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._form.querySelectorAll(".form__item"),this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;this._form=this._popup.querySelector(".form"),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._getInputValues())})),C(j(u.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._form.reset(),C(j(u.prototype),"close",this).call(this)}},{key:"renderLoading",value:function(e){e?(this._submitButton.textContent="Сохранение...",this._submitButton.setAttribute("disabled",!0)):(this._submitButton.textContent=this._submitButtonLabel,this._submitButton.removeAttribute("disabled"))}}])&&w(t.prototype,n),u}(s);function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=t.name,this._aboutSelector=t.about,this._avatarSelector=t.avatar,this._avatarImage=document.querySelector(this._avatarSelector),this._profileName=document.querySelector(this._nameSelector),this._profileAbout=document.querySelector(this._aboutSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileAbout.textContent}}},{key:"setUserInfo",value:function(e,t){this._profileName.textContent=e,this._profileAbout.textContent=t}},{key:"setUserAvatar",value:function(e){this._avatarImage.setAttribute("src",e)}}])&&A(t.prototype,n),e}();function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),I(this,"_formElement",void 0),I(this,"_formSelector",void 0),I(this,"_inputSelector",void 0),I(this,"_submitButtonSelector",void 0),I(this,"_inactiveButtonClass",void 0),I(this,"_inputErrorClass",void 0),I(this,"_errorClass",void 0),I(this,"_buttonElement",void 0),I(this,"_inputList",void 0),this._formElement=n,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector))}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_toggleButtonState",value:function(){this._inputList.some((function(e){return!e.validity.valid}))?(this._buttonElement.setAttribute("disabled",!0),this._buttonElement.classList.add(this._inactiveButtonClass)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._inactiveButtonClass))}},{key:"_setEventListener",value:function(){var e=this;this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))})),this._toggleButtonState()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListener()}}])&&R(t.prototype,n),e}(),T=document.querySelector(".profile__edit-button"),D=document.querySelector(".popup_type_profile"),x=D.querySelector(".form"),U=D.querySelector(".form__item_type_name"),V=D.querySelector(".form__item_type_about"),N=document.querySelector(".profile__add-button"),F=document.querySelector(".popup_type_card"),z=document.querySelector(".cards"),J=F.querySelector(".form"),H=document.querySelector(".profile__avatar-hover"),M=document.querySelector(".popup_type_edit-avatar").querySelector(".form"),G=new P({name:".profile__name",about:".profile__about",avatar:".profile__avatar"}),K=new S(".popup_type_photo");function Q(e,t){K.open(e,t)}K.setEventListeners();var W=new d(".popup_type_delete");function X(e,t){W.open(),W.setFormSubmit((function(){W.close(),Z.deleteCardApi(t).then((function(){e.remove()})).catch((function(e){return console.log(e)}))}))}function Y(e,t,n,r,i,u,a){return new o(e,t,n,r,i,u,a).generateCard()}W.setEventListeners();var Z=new n({url:"https://mesto.nomoreparties.co/v1/cohort-27/"},"8ab69193-abde-425d-8080-68fbeb2c2f47");Z.getUserInfoApi().then((function(e){G.setUserInfo(e.name,e.about),G.setUserAvatar(e.avatar),Z.getCards().then((function(t){var n=new u({items:t,renderer:function(t){var r=function(e,t){return e.likes.map((function(e){return e._id})).includes(t._id)}(t,e);t.owner._id===e._id?n.addItem(Y(t,".card-template-with-delete",Q,X,Z,r,e)):n.addItem(Y(t,".card-template",Q,X,Z,r,e))}},".cards");n.renderItems()})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}));var $=new B(e,x);$.enableValidation();var ee=new B(e,J);ee.enableValidation();var te=new B(e,M);te.enableValidation();var ne=new q(".popup_type_edit-avatar",(function(e){ne.renderLoading(!0),Z.createNewUserAvatarApi(e).then((function(e){G.setUserAvatar(e.avatar),ne.close()})).catch((function(e){return console.log(e)})).finally((function(){ne.renderLoading(!1)}))})),re=new q(".popup_type_card",(function(e){re.renderLoading(!0),Z.createCardApi(e).then((function(e){z.prepend(Y(e,".card-template-with-delete",Q,X,Z)),re.close(),J.reset()})).catch((function(e){return console.log(e)})).finally((function(){re.renderLoading(!1)}))})),oe=new q(".popup_type_profile",(function(e){oe.renderLoading(!0),Z.createNewUserInfoApi(e).then((function(e){G.setUserInfo(e.name,e.about),oe.close()})).catch((function(e){return console.log(e)})).finally((function(){oe.renderLoading(!1)}))}));ne.setEventListeners(),re.setEventListeners(),oe.setEventListeners(),T.addEventListener("click",(function(){var e=G.getUserInfo();U.value=e.name,V.value=e.about,oe.open(),$.resetValidation()})),N.addEventListener("click",(function(){re.open(),ee.resetValidation()})),H.addEventListener("click",(function(){ne.open(),te.resetValidation()}))})();