


// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/ProjectsSlice';
import tasksReducer from '../features/TasksSlice'; // Import the tasksReducer

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer, // Add the tasksReducer
  },
});

export default store;
