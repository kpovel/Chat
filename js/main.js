import {UI_ELEMENTS} from './view.js';
import format from 'date-fns/format';

UI_ELEMENTS.MESSAGE.INPUT_FIELD.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
UI_ELEMENTS.MESSAGE.BUTTON.addEventListener('click', sendMessage);


function sendMessage() {
    const message = UI_ELEMENTS.MESSAGE.INPUT_FIELD.value;
    const templateElement = UI_ELEMENTS.TEMPLATE.MESSAGE.content.cloneNode(true);
    if (message) {
        templateElement.firstElementChild.firstElementChild.textContent = `Я: ${message}`;
        templateElement.firstElementChild.lastElementChild.textContent = format(new Date(), 'HH:mm');
        UI_ELEMENTS.CHAT.append(templateElement);
        UI_ELEMENTS.MESSAGE.INPUT_FIELD.value = null;
    }
}