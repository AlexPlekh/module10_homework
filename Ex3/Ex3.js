// Задание 3

/* 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.

2. Добавить в чат механизм отправки геолокации.
При клике на кнопку «Геолокация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей геолокацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
*/

"use strict";

const sendButton = document.querySelector("#send-btn");
const geoButton = document.querySelector("#geo-btn");
const input = document.querySelector("#chat-input");
const messagesContainer = document.querySelector(".message-section");
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');

sendButton.addEventListener("click", () => sendMessage());
geoButton.addEventListener("click", () => sendGeo());

function sendMessage() {
    if (input.value === "") return;
    displayMyMessage(input.value);
    
    websocket.send(input.value);
    input.value = "";

    websocket.onmessage = (e) => displayServerMessage(e.data);

    function displayMyMessage(text) {
        let message = document.createElement('div');
        message.className = "message my-message"
        message.textContent = text;
        messagesContainer.append(message);
    };
    
    function displayServerMessage(text) {
        let message = document.createElement('div');
        message.className = "message server-message"
        message.textContent = text;
        messagesContainer.append(message);
    };   
    
};

function sendGeo() {
    if (!navigator.geolocation) {
        console.log("Геолокация не поддерживается вашим браузером");
        return;
    };

    websocket.onmessage = null;

    navigator.geolocation.getCurrentPosition((position) => {
        displayMyGeolocation(position.coords);
        websocket.send(position);
    });

    function displayMyGeolocation(coords) {
        let message = document.createElement('a');
        message.className = "message my-message";
        message.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
        message.textContent = "Мои координаты";
        message.target = "_blank";
        messagesContainer.append(message);
    };
    
};
