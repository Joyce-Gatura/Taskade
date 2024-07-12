


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import Home from './Pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Default route */}
          <Route path="/" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/home" element={<Home />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;