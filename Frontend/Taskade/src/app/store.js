import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/ProjectsSlice'
export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

export default store;
