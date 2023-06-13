import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD,
    JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN ? process.env.JWT_ACCESS_TOKEN : '',
    MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.roymogz.mongodb.net/whyDonate?retryWrites=true&w=majority`,
    SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    token: {
        jwtToken: JWT_ACCESS_TOKEN
    }
}