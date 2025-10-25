import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Task } from './Task';
import TaskList from './components/TaskList.tsx';
import AddTaskForm from './components/AddTaskForm.tsx';
import './App.css';

// const API_URL = 'http://localhost:5062/api/tasks';
const API_URL = 'https://muskanguptatask1.runasp.net/api/tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []); 
  const handleAddTask = (description: string) => {
    axios.post(API_URL, { description: description, isCompleted: false })
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const handleDeleteTask = (id: string) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleToggleTask = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;
    const updatedTask = { isCompleted: !taskToToggle.isCompleted };

    axios.put(`${API_URL}/${id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>My Task Manager</h1>
      </header>
      <main>
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
        />
      </main>
    </div>
  );
};

export default App;
