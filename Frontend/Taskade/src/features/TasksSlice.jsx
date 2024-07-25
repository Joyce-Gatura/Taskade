import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllTasksWithSubTasks, fetchSubTasksByTaskId } from '../Services/Taskapi'; 

const initialState = {
  tasks: [],
  subtasks: {}, 
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const response = await fetchAllTasksWithSubTasks();
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format: Expected an array of tasks.');
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
});

export const fetchSubTasks = createAsyncThunk('tasks/fetchSubTasks', async (taskId) => {
  try {
    const response = await fetchSubTasksByTaskId(taskId);
    if (!Array.isArray(response)) {
      throw new Error('Invalid data format: Expected an array of subtasks.');
    }
    return { taskId, subtasks: response };
  } catch (error) {
    throw new Error(`Failed to fetch subtasks for task ID ${taskId}: ${error.message}`);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null; 
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSubTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { taskId, subtasks } = action.payload;
        state.subtasks[taskId] = subtasks; 
        state.error = null; 
      })
      .addCase(fetchSubTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
