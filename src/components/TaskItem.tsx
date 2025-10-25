import React from 'react';
import type { Task } from '../Task'; 
interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onToggleTask }) => {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleTask(task.id)}
      />
      <span
        style={{
          textDecoration: task.isCompleted ? 'line-through' : 'none',
        }}
      >
        {task.description}
      </span>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;