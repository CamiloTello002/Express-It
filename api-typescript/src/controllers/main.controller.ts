import { Request, Response } from "express";

type User = {
    name: string;
    age: number;
}

export function getUsers(req: Request, res: Response){
    const users: User[] = [
        {name: "grace", age: 32},
        {name: "Joe", age: 40}
    ];
    res.send([]);
}