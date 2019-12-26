const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 4001;
const index = require('./routes');
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

const messages = [];
io.on('connection', socket => {
  console.log('New client connected:' + socket.id);

  //send all previous messages to the connected socket
  socket.emit('previousMessages', messages);
  console.log('previous messages:' + messages);

  socket.on('sendMessage', data => {
    messages.push(data);

    //broadcast emite para todos os sockets conectados
    socket.broadcast.emit('receivedMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
