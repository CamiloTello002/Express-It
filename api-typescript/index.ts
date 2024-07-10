import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 4001;

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        payload: 'this endpoint indeed works!'
    })
});

app.listen(port, () => {
    console.log(`connected to port ${port}`)
});