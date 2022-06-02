import {UI_ELEMENTS, switchOnConfirmationTab, switchOnMainTab} from './view.js';
import format from 'date-fns/format';
import Cookies from 'js-cookie';

const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';
const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);

socket.onmessage = function (event) {
    displayChatMessages([JSON.parse(event.data)]);
};


UI_ELEMENTS.MESSAGE.INPUT_FIELD.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessageToChat();
    }
});
UI_ELEMENTS.MESSAGE.BUTTON.addEventListener('click', sendMessageToChat);

function sendMessageToChat() {
    const message = UI_ELEMENTS.MESSAGE.INPUT_FIELD.value;
    if (message) {
        UI_ELEMENTS.MESSAGE.INPUT_FIELD.value = null;
        sendMessageToServer(message);
    }
}

async function sendMessageToServer(message) {
    socket.send(JSON.stringify({
        text: message,
    }));


}

export async function getCode() {
    const email = UI_ELEMENTS.AUTHORISATION.MAIL.value;
    const data = {email: email || Cookies.get('email')};
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

export async function saveToken() {
    const token = UI_ELEMENTS.CONFIRMATION.ENTER_CODE.value;
    Cookies.set('token', token);
    switchOnMainTab();
}

export async function setName() {
    const userName = UI_ELEMENTS.SETTING.USER_NAME.value;
    Cookies.set('userName', userName);

    const data = {name: userName};
    try {
        await fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(data),
        });
    }
    catch (e) {
        console.log(e);
    } finally {
        getDataAboutUser();
        switchOnMainTab();
    }
}

async function getDataAboutUser() {
    try {
        const response = await fetch('https://mighty-cove-31255.herokuapp.com/api/user/me', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        });
        const details = await response.json();
        console.log(details);
    }
    catch (e) {
        console.log(e);
    }
}

async function getMessages() {
    try {
        const response = await fetch('https://mighty-cove-31255.herokuapp.com/api/messages');
        const data = await response.json();

        await displayChatMessages(data.messages);
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
}

async function displayChatMessages(messages) {
    for (const message of messages) {
        if (message.user.email === Cookies.get('email')) {
            const templateMyMessage = UI_ELEMENTS.TEMPLATE.MY_MESSAGE.content.cloneNode(true);
            const {
                firstElementChild: {
                    firstElementChild: textMessage,
                    lastElementChild: dataMessage,
                }
            } = templateMyMessage;
            textMessage.textContent = `${message.user.name}: ${message.text}`;
            dataMessage.textContent = format(Date.parse(message.createdAt), 'HH:mm');
            UI_ELEMENTS.CHAT_MESSAGES.append(templateMyMessage);
        } else {
            const templateMessages = UI_ELEMENTS.TEMPLATE.COMPANION_MESSAGE.content.cloneNode(true);
            const {
                firstElementChild: {
                    firstElementChild: {
                        firstElementChild: textMessage,
                        lastElementChild: dataMessage,
                    }
                }
            } = templateMessages;
            textMessage.textContent = `${message.user.name}: ${message.text}`;
            dataMessage.textContent = format(Date.parse(message.createdAt), 'HH:mm');
            UI_ELEMENTS.CHAT_MESSAGES.append(templateMessages);
        }
        UI_ELEMENTS.CHAT.scrollTop += UI_ELEMENTS.CHAT.scrollHeight;
    }
}

getMessages();
