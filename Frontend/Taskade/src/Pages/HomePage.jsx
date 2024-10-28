

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';
import MainContent from '../Layout/Main';

import '../styles/home.css'
const HomePage = () => {
  const [currentContent, setCurrentContent] = useState('projects');

  return (
    <Flex direction="column" height="100vh" bg="">
      <Navbar setCurrentContent={setCurrentContent} />
      <Flex flex="1">
        <Sidebar setCurrentContent={setCurrentContent} />
        <Box flex="1" p={4}>
          <MainContent currentContent={currentContent} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomePage;

