import React from 'react';
import Navbar from '../Layout/Navbar';
import '../styles/home.css'; 
import Sidebar from '../Layout/Sidebar';
import ProjectsComponent from '../features/projects/ProjectsComponent';
import MainContent from '../Layout/Main';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Sidebar/>
      <ProjectsComponent/>
      <MainContent/>
      <div className="home-content">
      </div>
    </div>
  );
};

export default Home;


// src/pages/Home.jsx
// import React, { useState } from 'react';
// import Navbar from '../Layout/Navbar';
// import '../styles/home.css'; 
// import Sidebar from '../Layout/Sidebar';
// import MainContent from '../Layout/Main';

// const Home = () => {
//   const [currentContent, setCurrentContent] = useState('');

//   return (
//     <div className="home">
//       <Navbar />
//       <Sidebar setCurrentContent={setCurrentContent} />
//       <MainContent currentContent={currentContent} />
//       <div className="home-content">
//         {/* Other content for your home page */}
//       </div>
//     </div>
//   );
// };

// export default Home;
