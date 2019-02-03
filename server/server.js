require('./config/config');

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT;
const server = http.createServer((app));
const io = socketIO(server);
const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('Create message: ', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server.');

    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});






server.listen(port, () => {
    console.log(`Server is listnening on port ${port}`);
});

module.exports = { app };




