

import React from 'react';
import { Flex, Box, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 
import taskadeicon from '../assets/taskadeicon.png';

const Navbar = ({ setCurrentContent }) => {
  return (
    <Flex as="nav" bg="gray.100" p={4} align="center" justify="space-between">
      <Flex align="center">
        <Box boxSize="40px" mr={2}>
          <Image src={taskadeicon} alt="Taskade Icon" boxSize="100%" />
        </Box>
        <Heading as="h2" size="md">
          <Link to="/" onClick={() => setCurrentContent('home')}>Taskade</Link>
        </Heading>
      </Flex>
      <Flex align="center">
        <Text mx={4} onClick={() => setCurrentContent('notifications')}>Notifications</Text>
        <Text mx={4} onClick={() => setCurrentContent('settings')}>Settings</Text>
        <Text mx={4} onClick={() => setCurrentContent('help')}>Help</Text>
        <Text mx={4} onClick={() => setCurrentContent('about-us')}>About Us</Text>
        <Text mx={4} onClick={() => setCurrentContent('profile')}>Profile</Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;

