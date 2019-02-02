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

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});






server.listen(port, () => {
    console.log(`Server is listnening on port ${port}`);
});

module.exports = { app };




