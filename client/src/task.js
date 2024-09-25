export default function Task(props) {
  const { task, setTasks } = props;

  const updateTask = async (taskId, taskStatus) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status: taskStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTasks((currentTasks) => {
        return currentTasks.map((currentTask) => {
          if (currentTask._id === taskId) {
            return { ...currentTask, status: !currentTask.status };
          }
          return currentTask;
        });
      });
    }
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTasks((currentTasks) => {
        return currentTasks.filter((currentTask) => currentTask._id !== taskId);
      });
    }
  };

  return (
    <div className="task">
      <p>{task.task}</p>
      <div className="mutations">
        <button
          className="task__status"
          onClick={() => updateTask(task._id, task.status)}
        >
          {task.status ? "☑" : "☐"}
        </button>
        <button className="task__delete" onClick={() => deleteTask(task._id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}
