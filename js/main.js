import {UI_ELEMENTS, sendMessage} from './view.js';

UI_ELEMENTS.MESSAGE.INPUT_FIELD.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
UI_ELEMENTS.MESSAGE.BUTTON.addEventListener('click', sendMessage);

