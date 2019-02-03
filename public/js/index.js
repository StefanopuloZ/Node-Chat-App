let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    let li = document.createElement("li");
    li.innerText = `${message.from}: ${message.text}`;
    document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
    let li = document.createElement("li");
    li.innerHTML = `${message.from}: <a href="${message.url}" target="_blank">My location</a>`;
    document.getElementById('messages').appendChild(li);
})

document.getElementById('message-form').addEventListener('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById('message').value
    }, (data) => {

    });
});

let sendLocation = document.getElementById('send-location');
sendLocation.addEventListener('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    };

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location');
    }, {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 27000
        });
});
