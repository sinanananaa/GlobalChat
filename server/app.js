"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
const uuid = require('uuid-v4');

const server = require('http').Server(app);


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const port = "8000";

let clients = [];
let messages = [];
io.on('connection', client => {

  client.name = "user" + uuid();
  console.log('New client connected ', client.name);

  client.emit("client_name", client.name);
  client.emit("active_users", clients);
  client.emit("all_messages", messages);
  clients.push({name: client.name});
  client.broadcast.emit('new_user', client.name);

  client.on('new_message', message => {
    console.log("Server recieves new message", message, " from client ", client.name);
    let toSend = {
      id: uuid(),
      user: client.name,
      message: message
    }
    messages.push(toSend);
    io.emit('new_message', toSend);
  });

  client.on('disconnect', () => {
    console.log('Client disconnected ', client.name);
    clients = clients.filter(function( user ) {
      return user.name !== client.name;
    });
    io.emit("remove_user", client.name);
  });
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})