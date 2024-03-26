"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";


const TodoApp = ({ data }) => {
  const router = useRouter();
  const [cookies, removeCookie] = useCookies();
  const [todos, setTodos] = useState(data);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      postData(newTodo.trim());
      setNewTodo("");
    }
  };

  const signout = () => {
    removeCookie("token");
    removeCookie("email");
    router.push("/login");
    
  };

  const postData = async (newTodo) => {
    try {
      const res = await fetch("https://assessment-server-r6hy.onrender.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
          user_email: cookies.email,
          date: Date.now(),
        }),
      });
      setTodos([
        ...todos,
        { id: Date.now(), title: newTodo, completed: false },
      ]);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTodo(id) {
    try {
      const res = await fetch(`https://assessment-server-r6hy.onrender.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editTodo = async (id, newText) => {
    try {
      const res = await fetch(`https://assessment-server-r6hy.onrender.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newText,
          user_email: cookies.email, // Adjust user email as necessary
          date: Date.now(),
          completed: false, // Adjust as necessary
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: newText } : todo
        )
      );
      setEditingTodo(null);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos =
    filter === "Active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "Completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  return (
    <div className="absolute w-full max-w-md px-7 sm:px-4 mx-auto -translate-x-1/2   top-[10rem] left-1/2 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-[calc(2rem+1.5vw)] tracking-[1rem]">
          TODO
        </h1>
        <div>
          <button
            className="p-2 text-white border rounded-lg bg-very-dark-desaturated-blue"
            onClick={signout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="shadow-lg">
        <form onSubmit={handleSubmit} className="flex ">
          <input
            type="text"
            value={newTodo}
            onChange={handleChange}
            placeholder="Add a new todo"
            className="flex-grow h-12 px-6 py-2 text-white bg-very-dark-desaturated-blue rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-very-dark-grayish-blue-darker/60 rounded-r-md"
          >
            Add
          </button>
        </form>
      </div>

      
  
        <Todolist
          filteredTodos={filteredTodos}
          handleToggle={toggleTodo}
          handleDelete={deleteTodo}
          setEditingTodo={setEditingTodo}
          editingTodo={editingTodo}
          editTodo={editTodo}
        />
      

      {/* <FilterComponent
        todos={todos}
        setFilter={setFilter}
        handleClearCompleted={clearCompletedTodos}
        filter={filter}
      /> */}
    </div>
  );
};

export default TodoApp;

const Todolist = ({
  filteredTodos = [],
  handleToggle = () => {},
  handleDelete = () => {},
  setEditingTodo = () => {},
  editingTodo = null,
  editTodo = () => {},
}) => {
  const [editText, setEditText] = useState("");

  const handleEdit = (id, title) => {
    setEditingTodo(id);
    setEditText(title);
  };

  const handleEditSubmit = (id) => {
    editTodo(id, editText);
    setEditText("");
  };

  return (
    <div className="rounded-md bg-very-dark-desaturated-blue text-slate-400">
      {filteredTodos && filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border-b border-gray-700"
        >
          {editingTodo === todo.id ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="px-2 py-1 text-white bg-gray-700 rounded"
              />
              <button
                onClick={() => handleEditSubmit(todo.id)}
                className="px-2 py-1 ml-2 text-white bg-green-500 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              {/* <CustomCheckbox
                checked={todo.completed}
                handleToggle={() => handleToggle(todo.id)}
              /> */}
              <p
                className={`flex-grow text-sm ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </p>
              <button
                onClick={() => handleEdit(todo.id, todo.title)}
                className="mr-2 text-sm text-gray-400 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const FilterComponent = ({
  todos = [],
  setFilter = () => {},
  handleClearCompleted = () => {},
  filter,
}) => {
  return (
    <div className="p-1.5 rounded-md sm:p-3 bg-very-dark-desaturated-blue">
      <div className="flex flex-col items-center justify-center gap-3 text-sm text-gray-400 sm:justify-between sm:flex-row">
        <span>{todos.filter((todo) => !todo.completed).length} items left</span>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setFilter("All")}
            className={` ${filter === "All" ? "text-white" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={` ${filter === "Active" ? "text-white" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={` ${filter === "Completed" ? "text-white" : ""}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={handleClearCompleted}
          className=" hover:text-white focus:outline-none"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};
