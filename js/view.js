import format from 'date-fns/format';

export {UI_ELEMENTS, switchOnMainTab, insertMessage};

const UI_ELEMENTS = {
    BUTTONS_CLOSE: document.querySelectorAll('.row__close'),
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
        EMAIL: document.getElementById('email'),
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
        MESSAGE: document.getElementById('templateMessage'),
    }
};

UI_ELEMENTS.SETTING.BUTTON.addEventListener('click', switchOnTabSetting);
UI_ELEMENTS.BUTTONS_CLOSE.forEach((item) => {
    item.addEventListener('click', switchOnMainTab);
});

function switchOnTabSetting() {
    UI_ELEMENTS.TABS.MAIN.style.display = 'none';
    UI_ELEMENTS.TABS.SETTING.style.display = 'flex';
}

function switchOnMainTab() {
    UI_ELEMENTS.TABS.SETTING.style.display = 'none';
    UI_ELEMENTS.TABS.AUTHORISATION.style.display = 'none';
    UI_ELEMENTS.TABS.CONFIRMATION.style.display = 'none';
    UI_ELEMENTS.TABS.MAIN.style.display = 'flex';
}

function insertMessage(message, method, myEmail) {
    const templateMessage = UI_ELEMENTS.TEMPLATE.MESSAGE.content.cloneNode(true);
    const isMyMessage = message.user.email === myEmail;
    const {
        firstElementChild: {
            firstElementChild: {
                firstElementChild: textMessage,
                lastElementChild: dataMessage,
            }
        }
    } = templateMessage;

    if (isMyMessage) {
        templateMessage.firstElementChild.firstElementChild.className += ' message__sent';
    } else {
        templateMessage.firstElementChild.className = 'received-message';
        templateMessage.firstElementChild.firstElementChild.className += ' message__get';
    }
    textMessage.textContent = `${message.user.name}: ${message.text}`;
    dataMessage.textContent = format(Date.parse(message.createdAt), 'HH:mm');
    UI_ELEMENTS.CHAT_MESSAGES[method](templateMessage);
}
