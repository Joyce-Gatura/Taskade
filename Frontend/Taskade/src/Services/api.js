import axios from 'axios';

const API_URL = "http://localhost:5000";

export const fetchProjects = () => axios.get(`${API_URL}/api/projects`);
export const addTask = (projectId, task) => axios.post(`${API_URL}/api/projects/${projectId}/tasks`, task);
export const toggleTask = (projectId, taskId, task) => axios.put(`${API_URL}/api/projects/${projectId}/tasks/${taskId}`, task);
export const editTask = (projectId, taskId, task) => axios.put(`${API_URL}/api/projects/${projectId}/tasks/${taskId}`, task);
export const deleteTask = (projectId, taskId) => axios.delete(`${API_URL}/api/projects/${projectId}/tasks/${taskId}`);
export const deleteProject = (projectId) => axios.delete(`${API_URL}/api/projects/${projectId}`);


export const fetchAllTasksWithSubTasks = async () => {
    const response = await fetch('/api/tasks'); 
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  };
  
  export const fetchSubTasksByTaskId = async (taskId) => {
    const response = await fetch(`/api/tasks/${taskId}/subtasks`); 
    if (!response.ok) {
      throw new Error('Failed to fetch subtasks');
    }
    return response.json();
  };
  
  
  