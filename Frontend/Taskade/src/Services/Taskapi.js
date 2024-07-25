import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const fetchAllSubtasks = () => axios.get(`${API_URL}/subtasks`);
export const fetchAllTasksWithSubTasks = () => axios.get(`${API_URL}/tasks`);
export const addDailyTask = (task) => axios.post(`${API_URL}/daily-tasks`, task);
export const updateDailyTask = (taskId, task) => axios.put(`${API_URL}/daily-tasks/${taskId}`, task);
export const deleteDailyTask = (taskId) => axios.delete(`${API_URL}/daily-tasks/${taskId}`);

export const fetchSubTasksByTaskId = (subTask)=>axios.get(`{API_URL}/tasks/{task_id}/subtasks`)
export const addSubTask = (subTask) => axios.post(`${API_URL}/sub-tasks`, subTask);
export const updateSubTask = (subTaskId, subTask) => axios.put(`${API_URL}/sub-tasks/${subTaskId}`, subTask);
export const deleteSubTask = (subTaskId) => axios.delete(`${API_URL}/sub-tasks/${subTaskId}`);
