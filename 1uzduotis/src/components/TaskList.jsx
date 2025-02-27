import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p>Nėra užduočių.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))
      )}
    </ul>
  );
}
