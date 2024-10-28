


import React, { useState } from 'react';
import { Box, Radio, RadioGroup, VStack, Text } from '@chakra-ui/react';

const calculateTasksProgress = (tasks) => {
  const totalTasks = tasks.length;
  if (totalTasks === 0) return 0;

  const completedTasks = tasks.filter(task => task.completed).length;
  return (completedTasks / totalTasks) * 100;
};

const calculateProjectsProgress = (projects) => {
  const totalProjects = projects.length;
  if (totalProjects === 0) return 0;

  const completedProjects = projects.filter(project => {
    return project.tasks.every(task => 
      task.completed && task.subtasks.every(subtask => subtask.completed)
    );
  }).length;

  return (completedProjects / totalProjects) * 100;
};

const getMessage = (progress) => {
  if (progress === 100) {
    return "Congratulations! You've completed everything!";
  } else if (progress > 50) {
    return "Great job! You're more than halfway there!";
  } else {
    return "Keep going! You’re on the right track!";
  }
};

const ProgressTracker = ({ tasks = [], projects = [] }) => {
  const [selectedOption, setSelectedOption] = useState('tasks');

  const getProgress = () => {
    if (selectedOption === 'tasks') {
      const progress = calculateTasksProgress(tasks);
      return { progress, message: getMessage(progress) };
    } else if (selectedOption === 'projects') {
      const progress = calculateProjectsProgress(projects);
      return { progress, message: getMessage(progress) };
    }
  };

  const { progress, message } = getProgress() || { progress: 0, message: '' };

  return (
    <Box p={5}>
      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
        <VStack align="start">
          <Radio value="tasks">Tasks</Radio>
          <Radio value="projects">Projects</Radio>
        </VStack>
      </RadioGroup>
      <VStack mt={4} align="start">
        <Text fontSize="xl">Progress: {progress.toFixed(2)}%</Text>
        <Text>{message}</Text>
      </VStack>
    </Box>
  );
};

export default ProgressTracker;

