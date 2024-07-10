import express, {Express} from 'express';
import { getUsers } from './controllers/main.controller';

export function createApp(): Express{
    const app: Express = express();
    app.use("/api/users", getUsers);

    return app;
}