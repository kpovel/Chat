export const UI_ELEMENTS = {
    SETTING: {
        BUTTON: document.getElementById('buttonSetting'),
        CLOSE_SETTING: document.getElementById('closeSetting'),
    },
    CHAT: document.getElementById('chat'),
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

