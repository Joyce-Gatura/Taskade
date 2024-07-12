// src/components/Sidebar.jsx
import React from 'react';
import '../styles/sidebar.css';

const Sidebar = ({ setCurrentContent }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-item search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="sidebar-item" onClick={() => setCurrentContent('tasks')}>
        <span>Tasks</span>
      </div>
      <div className="sidebar-item" onClick={() => setCurrentContent('projects')}>
        <span>Projects</span>
      </div>
      <div className="sidebar-item" onClick={() => setCurrentContent('calendar')}>
        <span>Calendar</span>
      </div>
    </aside>
  );
};

export default Sidebar;
