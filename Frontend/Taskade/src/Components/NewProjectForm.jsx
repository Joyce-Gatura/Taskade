import React, { useState } from 'react';
import '../styles/newProjectForm.css';

const NewProjectForm = ({ addProject, closeForm }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
    if (title.trim() && startDate && endDate && tasks.length > 0) {
      const projectId = Date.now().toString();
      const newProject = {
        id: projectId,
        title,
        startDate,
        endDate,
        tasks: tasks.map((task, index) => ({
          id: `${projectId}-${index}-${Date.now()}`,
          content: task,
          completed: false
        }))
      };
      addProject(newProject);
      setTitle('');
      setStartDate('');
      setEndDate('');
      setTasks([]);
    }
  };

  return (
    <div className="new-project-form">
      <h2>Create Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="tasks-input">
        <input
          type="text"
          placeholder="Tasks"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Save</button>
      </div>
      <ul>
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
      <div className="input-group">
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button onClick={handleSubmit}>Submit Project</button>
        <button onClick={closeForm}>Cancel</button>
      </div>
    </div>
  );
};

export default NewProjectForm;
