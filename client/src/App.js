import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getTasks() {
      const res = await fetch("/api/tasks");
      const tasks = await res.json();

      setMessage(tasks.mssg);
    }
    getTasks();
  }, []);

  return (
    <main className="container">
      <h1>TaskMaster</h1>
      {message && <p>{message}</p>}
    </main>
  );
}
export default App;
