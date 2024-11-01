import React, { useState } from 'react';
import '../styles/newProjectForm.css';

const NewProjectForm = ({ addProject, closeForm }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSubmit = () => {
    if (title.trim() && tasks.length) {
      const newProject = {
        id: Date.now().toString(),
        title,
        dueDate: new Date().toISOString().split('T')[0],
        tasks: tasks.map((task) => ({ id: Date.now().toString(), content: task, completed: false }))
      };
      addProject(newProject);
      setTitle('');
      setTasks([]);
      closeForm();
    }
  };

  return (
    <div className="new-project-form">
      <h2>Create Project</h2>
      <input
        type="text"
        placeholder="Enter Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="tasks-input">
        <input
          type="text"
          placeholder="Enter Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="text"
              value={task}
              onChange={(e) => handleEditTask(index, e.target.value)}
            />
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="form-buttons">
        <button onClick={handleSubmit}>Submit Project</button>
        <button onClick={closeForm}>Cancel</button>
      </div>
    </div>
  );
};

export default NewProjectForm;
