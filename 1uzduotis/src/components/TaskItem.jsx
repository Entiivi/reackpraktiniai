export default function TaskItem({ task, toggleTask, deleteTask }) {
    return (
      <li className={`task-item ${task.completed ? "completed" : ""}`}>
        <span onClick={() => toggleTask(task.id)}>{task.text}</span>
        <button onClick={() => toggleTask(task.id)}>
          {task.completed ? "Atžymėti" : "Atlikta"}
        </button>
        <button onClick={() => deleteTask(task.id)}>Ištrinti</button>
      </li>
    );
  }
  