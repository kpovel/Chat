import {UI_ELEMENTS, insertMessage} from './view.js';
import Cookies from 'js-cookie';

const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);

socket.onmessage = function (event) {
    console.log(event.data);
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

async function displayChatMessages(messages, method) {
    if (!messages.length){
        alert('Уся історія завантажена');
    }
    const bundleMessages = messages.splice(messages.length - 20);
    const changedArr = method ? bundleMessages.reverse() : bundleMessages;

    changedArr.forEach(item => {
        insertMessage(item, method || 'append', Cookies.get('email'));
    });

    if (!method) {
        UI_ELEMENTS.CHAT.scrollTop += UI_ELEMENTS.CHAT.scrollHeight;
    }

    UI_ELEMENTS.CHAT.addEventListener('scroll', function () {
        if (UI_ELEMENTS.CHAT.scrollTop === 0) {
            UI_ELEMENTS.CHAT.scrollTop += 1;
            displayChatMessages(messages, 'prepend');
        }
    });
}

getMessages();

