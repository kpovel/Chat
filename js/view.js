import format from 'date-fns/format';

export const UI_ELEMENTS = {
    SETTING: {
        BUTTON: document.getElementById('buttonSetting'),
        CLOSE_SETTING: document.getElementById('closeSetting'),
    },
    CHAT: document.getElementById('chat__messages'),
    MESSAGE: {
        INPUT_FIELD: document.getElementById('messageInputField'),
        BUTTON: document.getElementById('buttonSendingMessage'),
    },
    TEMPLATE: {
        MESSAGE: document.getElementById('templateMessage'),
    }
};

export const TABS = {
    MAIN: document.getElementById('main'),
    SETTING: document.getElementById('setting'),
};

UI_ELEMENTS.SETTING.BUTTON.addEventListener('click', switchOnTabSetting);
UI_ELEMENTS.SETTING.CLOSE_SETTING.addEventListener('click', switchOnMainTab);

function switchOnTabSetting() {
    TABS.MAIN.style.display = 'none';
    TABS.SETTING.style.display = 'flex';
}

function switchOnMainTab() {
    TABS.SETTING.style.display = 'none';
    TABS.MAIN.style.display = 'flex';
}

export function sendMessage() {
    const message = UI_ELEMENTS.MESSAGE.INPUT_FIELD.value;
    const templateElement = UI_ELEMENTS.TEMPLATE.MESSAGE.content.cloneNode(true);
    if (message) {
        templateElement.firstElementChild.firstElementChild.textContent = `Я: ${message}`;
        templateElement.firstElementChild.lastElementChild.textContent = format(new Date(), 'HH:mm');
        UI_ELEMENTS.CHAT.append(templateElement);
        UI_ELEMENTS.MESSAGE.INPUT_FIELD.value = null;
    }
}