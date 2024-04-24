import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import TodolistModel from "./models/Todolist.mjs";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import Project from "./models/Project.mjs";

// dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.dkh3jgk.mongodb.net/Todolist?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error connecting db", err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  TodolistModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Login Successfull" });
        } else {
          res.json({ message: "Password didn't match" });
        }
      } else {
        res.json({ message: "User not registered" });
      }
    })
    .catch((err) => res.json({ error: err, message: "Login failed" }));
});

//new user crete
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  TodolistModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "email already exists" });
      } else {
        TodolistModel.create({ name, email, password })
          .then((user) => {
            res.status(200).json({ message: "signup succesfully", user });
          })
          .catch((err) => {
            res.status(500).json({ err, message: "signup failed" });
          });
      }
    })
    .catch((err) =>
      res.status(500).json({ error: err, message: "Signup failed" })
    );
});

app.get("/homepage", (req, res) => {
  Project.find()
    .then((projects) => {
      res.status(200).json({ projects });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

//view the project details
app.get("/view/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      res.status(200).json({ project });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

//edit project deatails
app.get("/edit:id", (req, res) => {});

app.put("/addTitle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.title = title;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error updating title" });
  }
});

app.delete("/deleteProject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({
      message: "Project deleted successfully",
      deletedProject: project,
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOneAndUpdate(
      { "todos._id": id },
      { $pull: { todos: { _id: id } } },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

//new todo
app.put("/addTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status, updatedDate } = req.body;
    const project = await Project.findById(id);
    const newTodo = {
      description: description,
      status: status,
      updatedDate: updatedDate,
    };
    project.todos.push(newTodo);
    await project.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error adding new todo" });
  }
});

// new project
app.post("/add", (req, res) => {
  const { projectTitle, todos } = req.body;
  Project.create({
    title: projectTitle,
    todos: todos,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ err });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 