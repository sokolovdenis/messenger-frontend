import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"

if (false) {

    var socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=eyJhbGciOiJ");

    socket.onopen = function () {
        alert("Соединение установлено.");
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            alert('Соединение закрыто чисто');
        } else {
            alert('Обрыв соединения'); // например, "убит" процесс сервера
        }
        alert('Код: ' + event.code + ' причина: ' + event.reason);
    };

    socket.onmessage = function (event) {
        alert("Получены данные " + event.data);
    };

    socket.onerror = function (error) {
        alert("Ошибка " + error.message);
    };

}


// ========================================



if (true) {
    function tick() {
        ReactDOM.render(
            //<MessageActivity currentUser="public"/>,
            //<Messenger/>,
            //<DialogList/>,
            <App/>,
            document.getElementById('root')
        );
    }

    //setInterval(tick, 1000);
    tick();
}