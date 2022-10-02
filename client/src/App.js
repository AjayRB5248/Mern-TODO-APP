import { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "./../src/assets/delete.png";
import flag from './../src/assets/flag.jpg'
import "./App.modules.css";

const BASE_URL = "http://localhost:5000/api";

function App() {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => 
        console.error(err))
      };

    const handleAddTodo = () => {
      axios
        .post(`${BASE_URL}/todo/new`, {
          title: "Ajay",
        })
        .then((res) => {
          setTodos([...todos, res.data]);
          setTodo("");
        })
        .catch((err) => 
          console.log(err))
        };
        
    const handleDeleteTodo = (id) => {
      axios
        .delete(`${BASE_URL}/todo/delete/${id}`)
        .then((res) => {
          setTodos(todos.filter((todo) => todo._id !== res.data._id));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleTodoClick = (id) => {
      axios
        .get(`${BASE_URL}/todo/toggleStatus/${id}`)
        .then((res) => getTodos())
        .catch((err) => {
          console.log(err);
        });
    };
  
  return (
    <div className="App">
    <div className="logo">
    <img src={flag} alt="delete" height="30px" width="20px" />
    <h1>Nepali Todo App</h1>
    </div>
      <div className="todo-input-wrapper">
        <input
          className="todo-input-bar"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <div className="add-button" onClick={handleAddTodo}>
          +
        </div>
      </div>
      <div className="todos-list">
        {!todos || !todos.length ? (
          <h3 style={{ textAlign: "center" }}>No Todos Data!</h3>
        ) : (
          todos.map((todo) => (
            <div className="todo" key={todo._id}>
              <span
                onClick={() => handleTodoClick(todo._id)}
                className={todo.complete ? "complete" : ""}
                id="todo-title"
              >
                {todo.title}
              </span>
              <span
                className="delete"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                <img src={deleteIcon} alt="delete" height="20px" width="20px" />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
