import React from "react";
import "./App.css";

function Tlist({ todos }) {
  let i = 1;
  return (
    <>
      {todos.map((todo) => {
        let temp = "http://localhost:3000/todos/" + todo.id;
        return (
          <div>
            <form action={temp} method="POST">
              <span>{i++}.</span>
              <span>{todo.description}</span>
              <button>X</button>
            </form>
          </div>
        );
      })}
    </>
  );
}

function App() {
  let [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/todol").then((res) => {
      res.json().then((data) => {
        setTodos(data);
      });
    });
  }, []);

  return (
    <>
      <div>
        <h1>Todo</h1>
      </div>
      <Tlist todos={todos} />
      <div>
        <form
          action="http://localhost:3000/todos"
          method="GET"
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="add todo"
            name="description"
            id="description"
          />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default App;
