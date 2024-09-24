import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function getTodos() {
      const res = await fetch("http:localhost:5000/api/todos");
      const todos = await res.json();

      console.log(todos);
    }
    getTodos();
  }, []);

  return (
    <main className="container">
      <h1>TaskMaster</h1>
    </main>
  );
}
export default App;
