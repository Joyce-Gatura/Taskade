


import React from 'react';
import { Box, Input, List, ListItem, Link, Text } from '@chakra-ui/react';

const Sidebar = ({ setCurrentContent }) => {
  return (
    <Box
      as="aside"
      width="150px"
      bg="gray.200"
      p={4}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Input placeholder="Search..." mb={4} />
      <List spacing={3}>
        <ListItem>
          <Link onClick={() => setCurrentContent('tasks')}>
            <Text> My Tasks</Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link onClick={() => setCurrentContent('projects')}>
            <Text>Projects</Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link onClick={() => setCurrentContent('calendar')}>
            <Text>Calendar</Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link onClick={() => setCurrentContent('progress-tracker')}>
            <Text>Progress Tracker</Text>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

