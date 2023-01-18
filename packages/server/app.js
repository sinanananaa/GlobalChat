import express from 'express';
import { PORT, REACT_APP_URL, DB_CONNECT_STRING } from "./src/config/env";
import cors from 'cors';
import api from './src/api';
import mongoose from 'mongoose';

mongoose.connect(DB_CONNECT_STRING, {
    useNewUrlParser: true
  }).catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}));

api(app);

//const server = require('http').Server(app);

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const socket = require("./socket.js");
socket(io);