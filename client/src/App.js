import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setMessage(todos.mssg);
    }
    getTodos();
  }, []);

  return (
    <main className="container">
      <h1>TaskMaster</h1>
      {message && <p>{message}</p>}
    </main>
  );
}
export default App;
