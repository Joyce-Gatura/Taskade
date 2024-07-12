

import React from 'react';
import logo from '../assets/teamgoalsfor2020.jpg'
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'
const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="header">
        <img src={logo} alt="Taskade Logo" className="logo" />
        <h1>Welcome to Taskade App!</h1>
      </div>
      <p>      Here, you can effortlessly
         manage your projects, track your tasks, and collaborate with your team in real time.
          Whether you are organizing personal to-dos or handling complex team projects, 
          Taskade provides you with the tools you need to stay productive and efficient.
      .</p>
      
      <Link to="/home">Go to Home Page</Link>
    </div>
  );
};

export default DashboardPage;
