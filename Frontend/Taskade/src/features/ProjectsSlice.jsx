

import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    editProject: (state, action) => {
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    },
    deleteProject: (state, action) => {
      return state.filter(project => project.id !== action.payload);
    }
  }
});

export const { addProject, editProject, deleteProject } = projectsSlice.actions;

export default projectsSlice.reducer;

