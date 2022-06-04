import {UI_ELEMENTS} from './view.js';
import {authorization, getCode, saveToken, setName} from './authorization.js';
import Cookies from 'js-cookie';

export {switchOnAuthorisationTab, switchOnConfirmationTab, changeTextAuthorizationButton};

UI_ELEMENTS.AUTHORISATION.BUTTON.addEventListener('click', authorization);
UI_ELEMENTS.AUTHORISATION.GET_CODE.addEventListener('click', getCode);
UI_ELEMENTS.AUTHORISATION.EMAIL.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCode();
    }
});
UI_ELEMENTS.CONFIRMATION.LOG_IN_CHAT.addEventListener('click', saveToken);
UI_ELEMENTS.CONFIRMATION.ENTER_CODE.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        saveToken();
    }
});
UI_ELEMENTS.SETTING.SET_NAME.addEventListener('click', setName);
UI_ELEMENTS.SETTING.USER_NAME.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        setName();
    }
});

function switchOnAuthorisationTab() {
    UI_ELEMENTS.TABS.MAIN.style.display = 'none';
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'flex';
}

function switchOnConfirmationTab() {
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'none';
    UI_ELEMENTS.TABS.CONFIRMATION.style.display = 'flex';
}

function changeTextAuthorizationButton() {
    if (Cookies.get('token')) {
        UI_ELEMENTS.AUTHORISATION.BUTTON.textContent = 'Вийти';
    } else {
        UI_ELEMENTS.AUTHORISATION.BUTTON.textContent = 'Увійти';
    }
}

changeTextAuthorizationButton();
