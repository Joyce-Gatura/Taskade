import React from 'react';
import '../styles/navbar.css'; 
import taskadeicon from '../assets/taskadeicon.png';
import profilepic from '../assets/profile.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="taskade-icon">
          <img src={taskadeicon} alt="Taskade Icon" />
        </div>
        <div className="taskade-icon">
        </div>
        <h2>Taskade</h2>
      </div>
      <div className="navbar-right">
      <div className="notification">
          <span>🔔</span>
        </div>
        <div className="settings">
          <span>Settings</span>
        </div>
        <div className="help">
          <span>Help</span>
        </div>
        
        <div className="profile">
          <img src={profilepic} alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
