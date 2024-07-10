import express, { Express, Request, Response } from "express";
import { getUsers } from "./controllers/main.controller";
import { createApp } from "./createApp";

const app: Express = createApp();

const port: number = 4001;

app.listen(port, () => {
    console.log(`connected to port ${port}`)
});