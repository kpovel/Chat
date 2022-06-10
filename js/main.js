import {UI_ELEMENTS, insertMessage} from './view.js';
import Cookies from 'js-cookie';
import {NoMessageError, SocketClosedError} from './customErrors.js';

const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);

socket.addEventListener('message', function (event) {
    displayChatMessages([JSON.parse(event.data)]);
});


UI_ELEMENTS.MESSAGE.INPUT_FIELD.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        try {
            sendMessageToChat();
        }
        catch (err) {
            console.log('Unknown error');
        }
    }
});
UI_ELEMENTS.MESSAGE.BUTTON.addEventListener('click', function () {
    try {
        sendMessageToChat();
    }
    catch (err) {
        console.log('Unknown error');
    }
});

function sendMessageToChat() {
    const message = UI_ELEMENTS.MESSAGE.INPUT_FIELD.value;
    UI_ELEMENTS.MESSAGE.INPUT_FIELD.value = null;

    try {
        if (!message) {
            throw new NoMessageError('No message');
        }

        sendMessageToServer(message);
    }
    catch (err) {
        if (err instanceof NoMessageError) {
            alert(err.message);
        } else {
            throw err;
        }
    }
}


async function sendMessageToServer(message) {
    try {
        if (socket.readyState === 3) {
            throw new SocketClosedError('Socket is already closed');
        }
        socket.send(JSON.stringify({
            text: message,
        }));
    }
    catch (err) {
        if (err instanceof SocketClosedError) {
            alert(err.message);
        } else {
            throw err;
        }
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

async function displayChatMessages(messages, method) {
    if (!messages.length) {
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
