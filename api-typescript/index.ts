import { Request, Response } from "express";

const express = require('express');

const app = express();
const port: number = 4001;

app.get('/', (req: Request, res: Response) => {
    res.send('no se mano');
})

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})