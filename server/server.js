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
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/isRealString');
const { Users } = require('./utils/users');

let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        };

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        socket.broadcast.to(params.room).emit('newMessage',
            generateMessage('Admin', `${params.name} has joined room "${params.room}".`));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Create message: ', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server.');

    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room "${user.room}".`));
        }
    });
});






server.listen(port, () => {
    console.log(`Server is listnening on port ${port}`);
});

module.exports = { app };




