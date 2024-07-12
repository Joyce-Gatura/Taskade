


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, addProject, deleteProject } from '../ProjectsSlice';
import ProjectsTab from '../../Components/ProjectsTab';
import NewProjectForm from '../../Components/NewProjectForm';
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
    <div className="main-content">
      <div className="main-content-header">
        <h1>Projects</h1>
        <button onClick={() => setIsCreating(true)}>New Project</button>
      </div>
      <ProjectsTab
        projects={projects}
        editProject={handleEditProject}
        deleteProject={handleDeleteProject}
      />
      {isCreating && (
        <NewProjectForm addProject={handleAddProject} closeForm={() => setIsCreating(false)} />
      )}
    </div>
  );
};

export default ProjectsComponent;
