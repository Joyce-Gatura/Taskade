
import { useState, useEffect } from 'react';
import { Box, Button, VStack, HStack, Text, Input, OrderedList, ListItem, IconButton, Alert, AlertIcon } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { fetchProjects, addTask, toggleTask, editTask, deleteTask as deleteTaskApi, deleteProject as deleteProjectApi } from '../Services/api';
import '../styles/projectsTab.css';

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskContent, setEditedTaskContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const[showMore, setIshShowMore] = useState(false)
  const [btnMoreOrLess, setBtnMoreOrLess] = useState(["Show More" || "Show Less"])

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetchProjects();
        if (response.status === 200) {
          setProjects(response.data);
        } else {
          setError('Error fetching projects');
        }
      } catch (error) {
        setError('Error fetching projects');
        console.error('Fetch Projects Error:', error);
      }
    };

    fetchProjectsData();
  }, []);

  const handleExpand = (projectId) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  };

  const handleShowMore =  () => {
    setIshShowMore(!showMore)
  }


  const handleAddTask = async (projectId) => {
    if (newTask.trim() === '') return;

    try {
      const response = await addTask(projectId, { content: newTask });
      if (response.status === 201) {
        const newTaskData = response.data;
        const updatedProjects = projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: [...project.tasks, newTaskData]
            };
          }
          return project;
        });
        setProjects(updatedProjects);
        setNewTask('');
        setEditingProjectId(null);
        setSuccess('Task added successfully');
      } else {
        setError('Error adding task');
      }
    } catch (error) {
      setError('Error adding task');
      console.error('Add Task Error:', error);
    }
  };

  const handleToggleTask = async (projectId, taskId) => {
    try {
      const project = projects.find(p => p.id === projectId);
      const task = project.tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      const response = await toggleTask(projectId, taskId, updatedTask);

      if (response.status === 200) {
        const updatedProjects = projects.map(p => {
          if (p.id === projectId) {
            const updatedTasks = p.tasks.map(t => (t.id === taskId ? updatedTask : t));
            return { ...p, tasks: updatedTasks };
          }
          return p;
        });
        setProjects(updatedProjects);
      } else {
        setError('Error toggling task');
      }
    } catch (error) {
      setError('Error toggling task');
      console.error('Toggle Task Error:', error);
    }
  };

  const handleEditTask = (taskId) => {
    const task = projects
      .find(project => project.id === expandedProjectId)
      .tasks.find(task => task.id === taskId);
    setEditingTaskId(taskId);
    setEditedTaskContent(task.content);
  };

  const handleSaveTask = async (projectId, taskId) => {
    try {
      const updatedTask = { content: editedTaskContent };
      const response = await editTask(projectId, taskId, updatedTask);

      if (response.status === 200) {
        const updatedProjects = projects.map(p => {
          if (p.id === projectId) {
            const updatedTasks = p.tasks.map(t => (t.id === taskId ? { ...t, ...updatedTask } : t));
            return { ...p, tasks: updatedTasks };
          }
          return p;
        });
        setProjects(updatedProjects);
        setEditingTaskId(null);
        setEditedTaskContent('');
        setSuccess('Task updated successfully');
      } else {
        setError('Error saving task');
      }
    } catch (error) {
      setError('Error saving task');
      console.error('Save Task Error:', error);
    }
  };

  const handleDeleteTask = async (projectId, taskId) => {
    try {
      const response = await deleteTaskApi(projectId, taskId);

      if (response.status === 200) {
        const updatedProjects = projects.map(p => {
          if (p.id === projectId) {
            const updatedTasks = p.tasks.filter(t => t.id !== taskId);
            return { ...p, tasks: updatedTasks };
          }
          return p;
        });
        setProjects(updatedProjects);
        setSuccess('Task deleted successfully');
      } else {
        setError('Error deleting task');
      }
    } catch (error) {
      setError('Error deleting task');
      console.error('Delete Task Error:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await deleteProjectApi(projectId);

      if (response.status === 200) {
        setProjects(projects.filter(project => project.id !== projectId));
        setSuccess('Project deleted successfully');
      } else {
        setError('Error deleting project');
      }
    } catch (error) {
      setError('Error deleting project');
      console.error('Delete Project Error:', error);
    }
  };

  return (
    <VStack className="projects-tab" spacing={4}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon />
          {success}
        </Alert>
      )}
      {projects.length > 0 ? (
        projects.map(project => (
          <Box key={project.id} className="project-item" p={5} borderWidth={1} borderRadius={5} w="100%">
            <HStack justify="space-between" align="center">
               <Text fontSize="2xl">{project.project_name}</Text>
              <Button onClick={() => handleExpand(project.id)}>
                {expandedProjectId === project.id ? 'Hide Details' : 'Show Details'}
              </Button>
            </HStack>
            {expandedProjectId === project.id && (
              <VStack align="start" spacing={4}>
                <Text>Due Date: {project.end_date}</Text>
                <OrderedList spacing={2} w="100%">
                 { showMore && (
                  project.tasks.map(task => (
                    <ListItem key={task.id}>
                      <HStack alignItems="center" justifyContent="space-between" w="100%">
                        {editingTaskId === task.id ? (
                          <Input
                            value={editedTaskContent}
                            onChange={(e) => setEditedTaskContent(e.target.value)}
                          />
                        ) : (
                          <Text as={task.completed ? 's' : 'span'}>{task.content}</Text>
                        )}
                        <HStack spacing={2}>
                          {editingTaskId === task.id ? (
                            <Button size="sm" onClick={() => handleSaveTask(project.id, task.id)}>Save</Button>
                          ) : (
                            <Button size="sm" onClick={() => handleEditTask(task.id)}>✏️</Button>
                          )}
                          <Button size="sm" onClick={() => handleToggleTask(project.id, task.id)}>
                            {task.completed ? '✅' : '🔄'}
                          </Button>
                          <IconButton
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteTask(project.id, task.id)}
                            aria-label="Delete Task"
                          />
                        </HStack>
                      </HStack>
                    </ListItem>
                  )))  || (
                  project.tasks.slice(0,1).map(task => (
                    <ListItem key={task.id}>
                      <HStack alignItems="center" justifyContent="space-between" w="100%">
                        {editingTaskId === task.id ? (
                          <Input
                            value={editedTaskContent}
                            onChange={(e) => setEditedTaskContent(e.target.value)}
                          />
                        ) : (
                          <Text as={task.completed ? 's' : 'span'}>{task.content}</Text>
                        )}
                        <HStack spacing={2}>
                          {editingTaskId === task.id ? (
                            <Button size="sm" onClick={() => handleSaveTask(project.id, task.id)}>Save</Button>
                          ) : (
                            <Button size="sm" onClick={() => handleEditTask(task.id)}>✏️</Button>
                          )}
                          <Button size="sm" onClick={() => handleToggleTask(project.id, task.id)}>
                            {task.completed ? '✅' : '🔄'}
                          </Button>
                          <IconButton
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteTask(project.id, task.id)}
                            aria-label="Delete Task"
                          />
                        </HStack>
                      </HStack>
                    </ListItem>
                  )) )}
                </OrderedList>
                <button onClick={()  => handleShowMore()}>{showMore ? 'Show Less' : 'Show More'}</button>
                {editingProjectId === project.id ? (
                  <VStack align="start" spacing={2} mt={4}>
                    <Input
                      placeholder="Enter new task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <HStack spacing={2}>
                      <Button onClick={() => handleAddTask(project.id)}>Add Task</Button>
                      <Button onClick={() => setEditingProjectId(null)}>Cancel</Button>
                    </HStack>
                  </VStack>
                ) : (
                  <HStack spacing={2} mt={4}>
                    <Button onClick={() => setEditingProjectId(project.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteProject(project.id)}>🗑️ Delete Project</Button>
                  </HStack>
                )}
              </VStack>
            )}
          </Box>
        ))
      ) : (
        <Text>No projects available.</Text>
      )}
    </VStack>
  );
};

export default ProjectsTab;



