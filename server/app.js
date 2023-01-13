"use strict";
import express from 'express';
import cors from 'cors';
import api from './src/api';

const app = express.express();

app.use(express.json());
app.use(cors({
    origin: REACT_APP_URL,
}));

// const http = require('http').Server(app);

// const socketIO = require('socket.io')(http, {
//   cors: {
//      origin: REACT_APP_URL,
//   }
// });

// socketIO.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });
// });

app.use(api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})