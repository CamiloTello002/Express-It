import { model, Schema, Types } from "mongoose";

// 1) create an interface that represents a document in MongoDB
interface IPost {
    title: string;
    summary: string;
    content: string;
    cover: string;
    author: Types.ObjectId;
};

const postSchema = new Schema<IPost>({
    title: { type: String },
    summary: { type: String},
    content: { type: String},
    cover: { type: String},
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

export const Post = model<IPost>('Post', postSchema);
