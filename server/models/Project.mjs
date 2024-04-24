import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  updatedDate: {
    type: Date,
    default: Date.now
  }
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdDate:{
    type:Date,
    default:Date.now(),
  },
  todos: [TodoSchema]
});

const ProjectModel = mongoose.model('Project', ProjectSchema, "Project");

export default ProjectModel;
