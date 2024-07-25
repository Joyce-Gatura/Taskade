


import React, { useState, useEffect } from 'react';
import '../styles/newProjectForm.css';
import axios from 'axios';

const NewProjectForm = ({ addProject, closeForm }) => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (closeForm) {
      setProjectName('');
      setStartDate('');
      setEndDate('');
      setTasks([]);
      setError(''); 
    }
  }, [closeForm]);

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

  const handleSubmit = async () => {
    if (projectName.trim() && startDate && endDate && tasks.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/projects', {
          project_name: projectName,
          start_date: startDate,
          end_date: endDate,
          tasks,
          progress_percentage: 0, // Set initial progress percentage to 0
        });

        console.log('Project created successfully:', response.data);
        addProject(response.data); // Assuming response.data is the created project
        setProjectName('');
        setStartDate('');
        setEndDate('');
        setTasks([]);
        closeForm(); 
      } catch (error) {
        console.error('Error creating project:', error);
        setError('Error creating project. Please try again.');
      }
    } else {
      setError('Please fill out all fields and add at least one task.');
    }
  };

  return (
    <div className="new-project-form">
      <h2>Create Project</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Project Title"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <div className="tasks-input">
        <input
          type="text"
          placeholder="Tasks"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
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
