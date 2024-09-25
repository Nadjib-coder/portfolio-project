import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      async function getTasks() {
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setTasks(data);
      }
      getTasks();
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error(`Login failed: ${res.statusText}`);
      }

      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token); // Store the token
    } catch (error) {
      console.error("Login error:", error.message); // Log any errors
    }
  };

  return (
    <main className="container">
      <h1>TaskMaster</h1>
      {!token ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.task}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default App;

// 1:13:52 FULL CRUD on FRONTEND
