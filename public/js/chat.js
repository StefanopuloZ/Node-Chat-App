let socket = io();

let scrollToBottom = () => {
    let messages = document.getElementById('messages');
    let newMessage = document.querySelector('li:last-child');
    let lastMessage = (document.querySelector('li:nth-last-child(2)')) ? document.querySelector('li:nth-last-child(2)') : 0;

    let scrollTop = messages.scrollTop;
    let scrollTopMax = messages.scrollTopMax;
    let newMessageHeight = newMessage.clientHeight;
    let lastMessageHeight = lastMessage.clientHeight;

    if (scrollTopMax - scrollTop <= newMessageHeight + lastMessageHeight * 2) {
        messages.scrollTop = scrollTopMax;
    };
};

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
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    let formatedTime = moment(message.createdAt).format('h:mm a'); 

    let template = document.getElementById('location-message-template').innerHTML;
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });

    document.getElementById('messages').innerHTML += html;
    scrollToBottom();
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
