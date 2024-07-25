

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get('/api/projects');
  return response.data;
});

export const addProject = createAsyncThunk('projects/addProject', async (project) => {
  const response = await axios.post('/api/projects', project);
  return response.data;
});

export const editProject = createAsyncThunk('projects/editProject', async (project) => {
  const response = await axios.put(`/api/projects/${project.project_id}`, project);
  return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId) => {
  await axios.delete(`/api/projects/${projectId}`);
  return projectId;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      });
  }
});

export default projectsSlice.reducer;
