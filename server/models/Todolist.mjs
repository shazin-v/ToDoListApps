import mongoose from 'mongoose';

const TodolistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const TodolistModel = mongoose.model('Todolist', TodolistSchema,"Todolist");

export default TodolistModel;
