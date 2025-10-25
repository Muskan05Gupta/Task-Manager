import React, { useState } from 'react';

// Define the props it receives from its parent (App.tsx).
interface AddTaskFormProps {
  onAddTask: (description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (description.trim()) { 
      onAddTask(description.trim()); // Trim whitespace before sending
      setDescription(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form-container">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
        aria-label="New task description"
      />
      <button 
        type="submit" 
        className="add-task-button" 
        disabled={!description.trim()} // Disable button if input is empty
      >
        {/* Public icon URL for a simple plus sign */}
        <img
          src="https://img.icons8.com/ios-filled/24/ffffff/plus.png" 
          alt="Add icon"
          style={{ width: '20px', height: '20px' }}
        />
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;