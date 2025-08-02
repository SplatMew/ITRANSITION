import dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;
export const HOST_PORT = process.env.HOST_PORT;
export const DB_URL = process.env.DB_URI;