import {switchOnMainTab, UI_ELEMENTS} from './view.js';
import {changeTextAuthorizationButton, switchOnAuthorisationTab, switchOnConfirmationTab} from './authorizationUI.js';
import Cookies from 'js-cookie';

export {authorization, getCode, saveToken, setName};

const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

function authorization() {
    if (Cookies.get('token')) {
        Cookies.remove('token');
        Cookies.remove('email');
        Cookies.remove('userName');
    } else {
        switchOnAuthorisationTab();
    }
    changeTextAuthorizationButton();
}

async function getCode() {
    const email = UI_ELEMENTS.AUTHORISATION.EMAIL.value;
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
        changeTextAuthorizationButton();
        switchOnConfirmationTab();
    }
}

async function saveToken() {
    const token = UI_ELEMENTS.CONFIRMATION.ENTER_CODE.value;
    Cookies.set('token', token);
    switchOnMainTab();
}

async function setName() {
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
