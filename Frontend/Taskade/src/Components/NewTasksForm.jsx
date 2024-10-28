orm;


import React, { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const NewTasksForm = ({ addTask, closeForm }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (closeForm) {
      resetForm();
    }
  }, [closeForm]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setError(''); // Clear any previous errors
    } else {
      setError('Subtask cannot be empty.');
    }
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !dueDate || tasks.length === 0) {
      setError('Title, due date, and at least one subtask are required.');
      return;
    }

    const newTasks = {
      title,
      dueDate: new Date(dueDate).toISOString(), 
      subTasks: tasks.map((task) => ({
        content: task,
        completed: false,
        progress: 0 
      }))
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks/subtasks', newTasks);
      console.log('Daily task created:', response.data);
      addTask(response.data); // Update the state with the new task from backend
      resetForm();
    } catch (error) {
      console.error('Error creating daily task:', error.response ? error.response.data : error.message);
      setError('Error creating daily task. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setTasks([]);
    setNewTask('');
    setDueDate('');
    setError('');
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" mt={4}>
      <Text fontSize="xl" mb={4}>Create Task</Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <Input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <Input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        mb={4}
      />
      <Flex>
        <Input
          placeholder="Subtask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          mb={4}
        />
        <Button onClick={handleAddTask} ml={2} mb={4}>Add</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <Flex justify="space-between" align="center">
              <Input
                value={task}
                onChange={(e) => handleEditTask(index, e.target.value)}
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDeleteTask(index)}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
      <Flex justify="space-between" mt={4}>
        <Button onClick={handleSubmit} colorScheme="blue">Submit</Button>
        <Button onClick={resetForm} colorScheme="yellow">Reset</Button>
        <Button onClick={closeForm} colorScheme="red">Cancel</Button>
      </Flex>
    </Box>
  );
};

export default NewTasksForm;
