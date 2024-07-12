

import React, { useState } from 'react';
import '../styles/projectsTab.css';

const ProjectsTab = ({ projects, editProject, deleteProject }) => {
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (projectId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedProject = {
          ...project,
          tasks: [...project.tasks, { id: `${projectId}-${Date.now()}`, content: newTask, completed: false }]
        };
        editProject(updatedProject);
        return updatedProject;
      }
      return project;
    });
    setNewTask('');
    setEditingProjectId(null);
  };

  const handleToggleTask = (projectId, taskId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedProject = {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
        editProject(updatedProject);
        return updatedProject;
      }
      return project;
    });
  };

  return (
    <div className="projects-tab">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="project-item">
            <h2>{project.title}</h2>
            <p>DueDate: {project.endDate}</p>
            <ul>
              {project.tasks.map((task) => (
                <li
                  key={task.id}
                  className={task.completed ? 'completed-task' : ''}
                  onClick={() => handleToggleTask(project.id, task.id)}
                >
                  {task.content}
                </li>
              ))}
            </ul>
            {editingProjectId === project.id ? (
              <div className="edit-task-form">
                <input
                  type="text"
                  placeholder="Enter new task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={() => handleAddTask(project.id)}>Add Task</button>
                <button onClick={() => setEditingProjectId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="project-actions">
                <button onClick={() => setEditingProjectId(project.id)}>Edit</button>
                <button onClick={() => deleteProject(project.id)}>🗑️</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
};

export default ProjectsTab;
