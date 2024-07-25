


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, addProject, deleteProject } from '../ProjectsSlice';
import ProjectsTab from '../../Components/ProjectsTab';
import NewProjectForm from '../../Components/NewProjectForm';
import { Box, Button, Heading, Flex } from '@chakra-ui/react';

const ProjectsComponent = () => {
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    document.title = `${projects.length} Projects Available`;
  }, [projects]);

  const handleAddProject = (project) => {
    dispatch(addProject(project));
    setIsCreating(false);
  };

  const handleEditProject = (updatedProject) => {
    dispatch(editProject(updatedProject));
  };

  const handleDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Projects</Heading>
        <Button colorScheme="blue" onClick={() => setIsCreating(true)}>New Project</Button>
      </Flex>
      <ProjectsTab
        projects={projects}
        editProject={handleEditProject}
        deleteProject={handleDeleteProject}
      />
      {isCreating && (
        <NewProjectForm addProject={handleAddProject} closeForm={() => setIsCreating(false)} />
      )}
    </Box>
  );
};

export default ProjectsComponent;
