import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';

import userRoutes from './routes/uesrs';
import tvShowRoutes from './routes/tvShow';

const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    next();
});

app.use('/users', userRoutes);
app.use('/tvShow', tvShowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("It worked!");
});

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => {
    console.log('Database connected!');
    app.listen(config.server.port, () => {
        console.log(`server is running on port : ${config.server.port}`);
    });
}).catch((e: any) => {
    console.log(e.message);
});

export = app;