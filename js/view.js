import {getCode, saveToken, setName} from './main.js';

export const UI_ELEMENTS = {
    TABS: {
        MAIN: document.getElementById('main'),
        SETTING: document.getElementById('setting'),
        AUTHORISATION: document.getElementById('authorisation'),
        CONFIRMATION: document.getElementById('confirmation'),
    },
    SETTING: {
        BUTTON: document.getElementById('buttonSetting'),
        CLOSE_SETTING: document.getElementById('closeSetting'),
        USER_NAME: document.getElementById('userName'),
        SET_NAME: document.getElementById('setName'),
    },

    AUTHORISATION: {
        BUTTON: document.getElementById('authorisationButton'),
        CLOSE_TAB: document.getElementById('closeAuthorisation'),
        MAIL: document.getElementById('mail'),
        GET_CODE: document.getElementById('getCode'),
    },
    CONFIRMATION: {
        CLOSE_TAB: document.getElementById('closeConfirmation'),
        ENTER_CODE: document.getElementById('code'),
        LOG_IN_CHAT: document.getElementById('logInToChat'),
    },
    CHAT_MESSAGES: document.getElementById('chat__messages'),
    CHAT: document.getElementById('chat'),
    MESSAGE: {
        INPUT_FIELD: document.getElementById('messageInputField'),
        BUTTON: document.getElementById('buttonSendingMessage'),
    },
    TEMPLATE: {
        MY_MESSAGE: document.getElementById('templateMyMessage'),
        COMPANION_MESSAGE: document.getElementById('templateCompanionMessage'),
    }
};

UI_ELEMENTS.SETTING.BUTTON.addEventListener('click', switchOnTabSetting);
UI_ELEMENTS.SETTING.CLOSE_SETTING.addEventListener('click', switchOnMainTab);
UI_ELEMENTS.AUTHORISATION.BUTTON.addEventListener('click', switchOnAuthorisationTab);
UI_ELEMENTS.AUTHORISATION.CLOSE_TAB.addEventListener('click', switchOnMainTab);
UI_ELEMENTS.AUTHORISATION.GET_CODE.addEventListener('click', getCode);
// todo: send code when press enter
UI_ELEMENTS.CONFIRMATION.CLOSE_TAB.addEventListener('click', switchOnMainTab);
UI_ELEMENTS.CONFIRMATION.LOG_IN_CHAT.addEventListener('click', saveToken);
UI_ELEMENTS.SETTING.SET_NAME.addEventListener('click', setName);


function switchOnTabSetting() {
    UI_ELEMENTS.TABS.MAIN.style.display = 'none';
    UI_ELEMENTS.TABS.SETTING.style.display = 'flex';
}

export function switchOnMainTab() {
    UI_ELEMENTS.TABS.SETTING.style.display = 'none';
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'none';
    UI_ELEMENTS.TABS.CONFIRMATION.style.display = 'none';
    UI_ELEMENTS.TABS.MAIN.style.display = 'flex';
}

function switchOnAuthorisationTab() {
    UI_ELEMENTS.TABS.MAIN.style.display = 'none';
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'flex';
}

export function switchOnConfirmationTab() {
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'none';
    UI_ELEMENTS.TABS.CONFIRMATION.style.display = 'flex';
}


