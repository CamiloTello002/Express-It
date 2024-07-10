import express, { Express, Request, Response } from "express";
import { getUsers } from "./controllers/main.controller";

const app: Express = express();
const port: number = 4001;

app.get('/', getUsers);

app.listen(port, () => {
    console.log(`connected to port ${port}`)
});