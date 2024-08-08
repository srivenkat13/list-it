import { useEffect, useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("saved-todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");

  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [data, setData] = useState("");

  useEffect(() => {
    localStorage.setItem("saved-todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      alert("Cannot add empty todo");
      return;
    }
    const isDuplicate = todos.some((todo) => todo.text === trimmedInput);
    if (isDuplicate) {
      alert("Todo Already exists");
      return;
    }
    setTodos([...todos, { text: trimmedInput, completed: false }]);

    setInput("");
  };
  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };
  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditInput(todos[index].text);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = editInput.trim();
    if (trimmedInput === "") {
      alert("Todo cannot be empty");
      return;
    }
    const isDuplicate = todos.some(
      (todo, i) => todo.text === trimmedInput && i !== editIndex
    );
    if (isDuplicate) {
      alert("Todo already exists");
      return;
    }
    const newTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: trimmedInput } : todo
    );
    setTodos(newTodos);
    setEditIndex(null);
    setEditInput("");
  };
  const handleDataSubmit = (e) => {
    e.preventDefault();
    const formatedArray = data.trim().split(/\n/);
    console.log(formatedArray);
    setTodos((prevTodos) => [
      ...prevTodos,
      ...formatedArray.map((word) => ({ text: word, completed: false })),
    ]);
    // console.log(todos);
    setData("");
  };
  const handleClear = () => {
    alert("Are you sure ?");
    setTodos([]);
  };
  return (
    <>
      <form onSubmit={handleDataSubmit}>
        <textarea
          id="item-data"
          name="data"
          value={data}
          placeholder="Paste list of items"
          required
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <button type="submit">Insert</button>
      </form>
      <button  class="clear"onClick={handleClear}>Clear all</button>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          placeholder="Enter Todo"
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? "completed" : ""}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {editIndex === index ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleToggleComplete(index)}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                {todo.completed && (
                  <button onClick={() => handleDelete(index)}>Remove</button>
                )}
                {!todo.completed && (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
