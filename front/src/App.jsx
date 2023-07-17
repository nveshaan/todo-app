import React, { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import "./App.css";

function Tlist({ todos, onDelete }) {
	let i = 1;
	return (
		<>
			{todos.map((todo) => (
				<div key={todo.id}>
					<form onSubmit={(e) => onDelete(e, todo.id)}>
						<span>{i++}.</span>
						<span>{todo.description}</span>
						<button type='submit'>X</button>
					</form>
				</div>
			))}
		</>
	);
}

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/todos")
			.then((res) => res.json())
			.then((data) => setTodos(data));
	}, []);

	const handleAddTodo = (e) => {
		e.preventDefault();
		const description = e.target.description.value;
		if (description.trim() !== "") {
			fetch("http://localhost:3000/todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ description }),
			})
				.then((res) => res.json())
				.then((data) => setTodos(data));
			e.target.reset();
		}
	};

	const handleDeleteTodo = (e, id) => {
		e.preventDefault();
		fetch(`http://localhost:3000/todos/${id}`, {
			method: "POST",
		})
			.then((res) => res.json())
			.then((data) => setTodos(data));
	};

	return (
		<>
			<SearchBar />

			<div>
				<h1>Todo</h1>
			</div>
			<Tlist todos={todos} onDelete={handleDeleteTodo} />
			<div>
				<form autoComplete='off' onSubmit={handleAddTodo}>
					<input type='text' placeholder='add todo' name='description' id='description' />
					<button type='submit'>Add</button>
				</form>
			</div>
		</>
	);
}

export default App;
