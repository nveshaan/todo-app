const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

let todos = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    description: req.body.description,
  };
  todos.push(newTodo);
  res.json(todos);
});

app.post("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.json(todos);
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;

app.listen(port, () => {
  console.log(`App listening on port ${port}
  -> http://localhost:${port}`);
});

// app.get("/todos/:id", (req, res) => {
//   const todo = todos.find((t) => t.id === parseInt(req.params.id));
//   if (!todo) {
//     res.status(404).send();
//   } else {
//     res.json(todo);
//   }
// });

// app.put("/todos/:id", (req, res) => {
//   const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     todos[todoIndex].description = req.body.description;
//     res.json(todos[todoIndex]);
//   }
// });
