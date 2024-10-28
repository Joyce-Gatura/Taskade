const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new sub-task
const createSubTask = async (req, res) => {
  const { content, task_id } = req.body;
  try {
    const subTask = await prisma.subTask.create({
      data: {
        content,
        task_id: Number(task_id),
      },
    });
    res.status(201).json(subTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating sub-task' });
  }
};

// Get all sub-tasks
const getAllSubTasks = async (req, res) => {
  try {
    const subtasks = await prisma.subTask.findMany();
    res.json(subtasks);
  } catch (error) {
    console.error('Error retrieving subtasks:', error);
    res.status(500).json({ message: 'An error occurred while retrieving subtasks' });
  }
};


//getting tasks alongside with the subtasks 
const getAllTasksWithSubTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        subTasks: true, 
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks with subtasks:', error);
    res.status(500).json({ message: 'An error occurred while retrieving tasks with subtasks' });
  }
};

// Update a sub-task
const updateSubTask = async (req, res) => {
  const { id } = req.params;
  const { content, completed, progress } = req.body;
  try {
    const subTask = await prisma.subTask.update({
      where: { id: Number(id) },
      data: {
        content,
        completed,
        progress
      },
    });
    res.json(subTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating sub-task' });
  }
};

// Delete a sub-task
const deleteSubTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.subTask.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting sub-task' });
  }
};

module.exports = {
  createSubTask,
  getAllSubTasks,
  updateSubTask,
  deleteSubTask,
  getAllTasksWithSubTasks
};
