



import React from 'react';
import { Box } from '@chakra-ui/react';
import CalendarComponent from '../Components/CalendarComponent';
import Profile from '../features/projects/Profile';
import AboutUs from '../features/projects/AboutUs';

import Notification from '../features/projects/Notification';
import TasksComponent from '../Components/TasksComponent';
import Settings from '../features/projects/Settings';
import ProjectsComponent from '../features/projects/ProjectsComponent';
import ProgressTracker from '../features/projects/ProgessTracker';
const MainContent = ({ currentContent }) => {
  return (
    <Box className="main-content">

      {currentContent === 'projects' && <ProjectsComponent />}
      {currentContent === 'tasks' && <TasksComponent/>}
      {currentContent === 'calendar' && <CalendarComponent/>}
      {currentContent === 'progress-tracker' && <ProgressTracker/>}
      {currentContent === 'notifications' && <Notification />}
      {currentContent === 'help' && <div>Help Content</div>}
      {currentContent === 'about-us' && <AboutUs />} 
      {currentContent === 'settings' && <Settings/>}
      {currentContent === 'profile' && <Profile/>}
    </Box>
  );
};

export default MainContent;

