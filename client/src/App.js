import { useEffect, useState } from "react";
import Task from "./task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTasks() {
      const res = await fetch("http://localhost:5000/api/tasks");
      const tasks = await res.json();

      setTasks(tasks);
    }
    getTasks();
  }, []);

  const createNewTask = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        body: JSON.stringify({ task: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTask = await res.json();

      setContent("");
      setTasks([...tasks, newTask]);
    }
  };
  return (
    <main className="container">
      <h1 className="title">TaskMaster</h1>
      <form className="form" onSubmit={createNewTask}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new Task..."
          className="form__input"
          required
        />
        <button className="form__button" type="submit">
          Create Task
        </button>
      </form>
      <div className={"tasks"}>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Task key={task._id} task={task} setTasks={setTasks} />
          ))}
      </div>
    </main>
  );
}
export default App;

// 1:17:17 FULL CRUD on FRONTEND
