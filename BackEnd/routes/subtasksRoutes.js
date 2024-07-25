const express = require('express');
const router = express.Router();
const {
  createSubTask,
  updateSubTask,
  deleteSubTask,
  getAllSubTasks,
  getAllTasksWithSubTasks
} = require('../controllers/subTasksController');

// Route to create a new sub-task
router.post('/subtasks', createSubTask);

router.get('/tasks', getAllTasksWithSubTasks);

// Route to get all sub-tasks
router.get('/subtasks', getAllSubTasks); // Fixed: Use the correct function name

// Route to update an existing sub-task
router.put('/subtasks/:id', updateSubTask);

// Route to delete a sub-task
router.delete('/subtasks/:id', deleteSubTask);

module.exports = router;
