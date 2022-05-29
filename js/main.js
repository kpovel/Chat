import {UI_ELEMENTS, switchOnConfirmationTab, switchOnMainTab} from './view.js';
import format from 'date-fns/format';
import Cookies from 'js-cookie';


const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

UI_ELEMENTS.MESSAGE.INPUT_FIELD.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessageToChat();
    }
});
UI_ELEMENTS.MESSAGE.BUTTON.addEventListener('click', sendMessageToChat);

function sendMessageToChat() {
    const message = UI_ELEMENTS.MESSAGE.INPUT_FIELD.value;
    const templateElement = UI_ELEMENTS.TEMPLATE.MY_MESSAGE.content.cloneNode(true);
    if (message) {
        templateElement.firstElementChild.firstElementChild.textContent = `Я: ${message}`;
        templateElement.firstElementChild.lastElementChild.textContent = format(new Date(), 'HH:mm');
        UI_ELEMENTS.CHAT.append(templateElement);
        UI_ELEMENTS.MESSAGE.INPUT_FIELD.value = null;
    }
}


export async function getCode() {
    const email = UI_ELEMENTS.AUTHORISATION.MAIL.value;
    const data = {email: email ?? Cookies.get(email)};
    try {
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (email) {
            Cookies.set('email', email);
        }
    }
    catch (e) {
        console.log(e);
    } finally {
        switchOnConfirmationTab();
    }
}

export function logInChat() {
    const code = UI_ELEMENTS.CONFIRMATION.ENTER_CODE.value;
    Cookies.set('code', code);
    switchOnMainTab();
}
