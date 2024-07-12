
import React from 'react';
import '../styles/main.css';

const MainContent = ({ currentContent }) => {
  const renderContent = () => {
    switch (currentContent) {
      case 'tasks':
        return <div>Tasks content goes here</div>;
      case 'projects':
        return (
          <div>
            <div className="projects-tab">Projects tab content goes here</div>
            <div className="new-project-form">New project form content goes here</div>
          </div>
        );
      case 'calendar':
        return <CalendarComponent />;
      default:
        return <div>Welcome! Please select an item from the sidebar.</div>;
    }
  };

  return (
    <div className="main-content">
      {renderContent()}
    </div>
  );
};

export default MainContent;


