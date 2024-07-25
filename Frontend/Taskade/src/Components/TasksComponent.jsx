


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner, Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { fetchTasks, fetchSubTasks } from '../features/TasksSlice';

const TasksComponent = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleViewSubTasks = (taskId) => {
    dispatch(fetchSubTasks(taskId)); 
    setSelectedTaskId(taskId);
  };

  const handleViewDetails = (taskId) => {
    dispatch(fetchTaskDetails(taskId)); 
    setSelectedTaskId(taskId);
  };

  if (status === 'loading') return <Spinner size="lg" />;
  if (status === 'failed') return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb={4}>Tasks</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Task ID</Th>
            <Th>Title</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <Tr key={task.id}>
              <Td>{task.task_id}</Td>
              <Td>{task.content}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleViewSubTasks(task.id)}
                  mr={2}
                >
                  View Subtasks
                </Button>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleViewDetails(task.id)}
                >
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TasksComponent;

