const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cors());

let todos = [];

app.get("/todol", (req, res) => {
  res.json(todos);
});

// app.get("/todos/:id", (req, res) => {
//   const todo = todos.find((t) => t.id === parseInt(req.params.id));
//   if (!todo) {
//     res.status(404).send();
//   } else {
//     res.json(todo);
//   }
// });

app.get("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    description: req.query.description,
  };
  todos.push(newTodo);
  res.redirect("http://localhost:5173/");
});

// app.put("/todos/:id", (req, res) => {
//   const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     todos[todoIndex].description = req.body.description;
//     res.json(todos[todoIndex]);
//   }
// });

app.post("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.redirect("http://localhost:5173/");
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
