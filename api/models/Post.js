const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'You must provide a string'],
    },
    summary: String,
    content: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
