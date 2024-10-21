import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        isComplete: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, updatedText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="text-white flex gap-6 flex-col justify-center items-center min-h-screen w-screen bg-black">
      <h1 className="text-4xl">Todo</h1>
      <div className="flex flex-col p-6 rounded-3xl min-h-[70vh] w-[90vw] sm:w-[60vw] md:w-[40vw] bg-transparent border-2 border-white">
        <div className="flex items-center rounded-full mt-6 mb-6 border-2 border-white">
          <input
            className="bg-transparent outline-none text-2xl flex-1 pl-6 placeholder:text-slate-700"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            type="text"
          />
          <button
            onClick={() => {
              addTodo();
            }}
            className="bg-green-500 text-black font-semibold border-2 border-white rounded-full w-32 h-14 text-2xl cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center rounded-full mb-6 border-2 border-white"
            >
              <input
                className={`bg-transparent outline-none text-2xl flex-1 pl-6 ${
                  todo.isComplete ? "line-through text-gray-500 scale-95"  : "text-white"
                }`}
                type="text"
                value={todo.text}
                onChange={(e) => editTodo(todo.id, e.target.value)}
              />
              <button
                className="bg-blue-500 text-black font-semibold border-2 border-white rounded-full w-32 h-14 text-2xl cursor-pointer"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.isComplete ? "Undo" : "Complete"}
              </button>
              <button
                className="bg-red-500 text-black font-semibold border-2 border-white rounded-full w-32 h-14 text-2xl cursor-pointer"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
