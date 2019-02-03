let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    let formatedTime = moment(message.createdAt).format('h:mm a');

    let template = document.getElementById('message-template').innerHTML;
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    document.getElementById('messages').innerHTML += html;




    // let li = document.createElement("li");
    // li.innerText = `${message.from} ${formatedTime}: ${message.text}`;
    // document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
    let formatedTime = moment(message.createdAt).format('h:mm a'); 
    let li = document.createElement("li");
    li.innerHTML = `${message.from} ${formatedTime}: <a href="${message.url}" target="_blank">My location</a>`;
    document.getElementById('messages').appendChild(li);
})

document.getElementById('message-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let messageTextBox = document.getElementById('message');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value
    }, (data) => {
        messageTextBox.value = '';
    });
});

let sendLocation = document.getElementById('send-location');

sendLocation.addEventListener('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    };

    sendLocation.setAttribute('disabled', 'true');
    sendLocation.innerText = 'Sending location...';

    navigator.geolocation.getCurrentPosition((position) => {
        sendLocation.removeAttribute('disabled');
        sendLocation.innerText = 'Send location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location');
        sendLocation.removeAttribute('disabled');
        sendLocation.innerText = 'Send location';
    }, {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 27000
        });
});
