

import React from 'react';
import logo from '../assets/scum.png';
import logo0 from '../assets/waterfall.jpg';
import logo1 from '../assets/Agile-Methodology.jpg';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { Box, Flex, Heading, Button, Text, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const DashboardPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box className="dashboard-page" bg={bg} color={textColor}>
      <Flex direction="column" height="100%">
        <Flex as="header" align="center" justify="space-between" p="4" borderBottomWidth="1px" bg={useColorModeValue("white", "gray.700")}>
          <Flex align="center" gap="4">
            <Heading className="heading" size="lg">Welcome to Taskade App!</Heading>
          </Flex>
          <Flex align="center" gap="4">
            <IconButton 
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} 
              onClick={toggleColorMode}
              aria-label="Toggle Dark Mode" 
              variant="outline" 
              colorScheme="blue"
            />
            <Link to="/home">
              <Button className="home-button">Go to Home Page</Button>
            </Link>
          </Flex>
        </Flex>

        <Flex flex="1" direction="column" p="4">
          <Box className="text-container">
            <Text fontSize="lg" mb="2">
              Here, you can effortlessly manage your projects, track your tasks. 
              Whether you are organizing personal to-dos or handling complex team projects, Taskade provides you with the tools you need to stay productive and efficient.
            </Text>
          </Box>

          <Box mb="4">
            <Heading size="md" mb="2">What Taskade Does:</Heading>
          </Box>

          <Flex wrap="wrap" gap="4">
            <Box className="widget">
              <Heading size="md" mb="2">Task Summary</Heading>
              <Text>Total Tasks: 5</Text>
              <Text>Completed: 2</Text>
              <Text>In Progress: 3</Text>
            </Box>

            <Box className="widget">
              <Heading size="md" mb="2">Project Summary</Heading>
              <Text>Total Projects: 3</Text>
              <Text>In Progress: 1</Text>
              <Text>Pending: 2</Text>
            </Box>

            <Box className="widget">
              <Heading size="md" mb="2">Progress Tracker</Heading>
              <Text>Tasks Completed: 40%</Text>
              <Text>Projects Completed: 30%</Text>
            </Box>

            <Box className="widget">
              <Heading size="md" mb="2">Events Creation:</Heading>
              <Text>Add Event</Text>
              <Text>Notify Approaching events</Text>
            </Box>
          </Flex>

          <Box mb="4" mt="8">
            <Heading size="md" mb="2">Development Frameworks Recommended:</Heading>
          </Box>

          <Box className="image-container">
            <img src={logo0} alt="Taskade Logo 1" />
            <img src={logo1} alt="Taskade Logo 2" />
            <img src={logo} alt="Taskade Logo 3" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardPage;
