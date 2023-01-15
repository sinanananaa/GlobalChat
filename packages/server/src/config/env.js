import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const REACT_APP_URL = process.env.REACT_APP_URL;
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

export {
    PORT,
    REACT_APP_URL,
    DB_CONNECT_STRING
};