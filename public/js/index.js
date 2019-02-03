let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    console.log('New message: ', message);

    let li = document.createElement("li");
    li.innerText = `${message.from}: ${message.text}`;
    document.getElementById("messages").appendChild(li);
});

document.getElementById("message-form").addEventListener("submit",function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById("message").value
    }, (data) => {

    });
});
