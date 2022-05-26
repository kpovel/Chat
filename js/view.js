export const tabs = {
    main: document.getElementById('main'),
    setting: document.getElementById('setting'),
};

const UI_ELEMENTS = {
    SETTING: {
        button: document.getElementById('buttonSetting'),
        closeSetting: document.getElementById('closeSetting'),
    },
};

UI_ELEMENTS.SETTING.button.addEventListener('click', switchOnTabSetting);
UI_ELEMENTS.SETTING.closeSetting.addEventListener('click', switchOnMainTab);

function switchOnTabSetting() {
    tabs.main.style.display = 'none';
    tabs.setting.style.display = 'flex';
}

function switchOnMainTab() {
    tabs.setting.style.display = 'none';
    tabs.main.style.display = 'flex';
}

