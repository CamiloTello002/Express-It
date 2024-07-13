import { Model, model, Schema } from "mongoose";

// 1) create an interface that represents a document in MongoDB
interface IUser {
    name: string;
    password: string;
};

// 2) create a schema that corresponds to the user interface
const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    password: { type: String, required: true},
});

// 3) create the model
export const User = model<IUser>('User', userSchema)