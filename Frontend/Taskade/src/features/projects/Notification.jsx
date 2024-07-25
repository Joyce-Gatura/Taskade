

import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  VStack,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa'; 
import axios from 'axios';

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/notifications/${userId}`);
        console.log('Response data:', response.data);

        if (Array.isArray(response.data)) {
          setNotifications(response.data);
          const unread = response.data.filter(notification => !notification.read).length;
          setUnreadCount(unread);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`/notifications/${id}`, { read: true });
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleClearAll = async () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FaBell color="yellow" size="24px" />} size="lg" variant="ghost">
        {unreadCount > 0 && <Badge colorScheme="red" borderRadius="full" ml={-1} mt={-2}>{unreadCount}</Badge>}
      </MenuButton>
      <MenuList maxW="sm" bg="gray.100">
        <Box p={4} borderBottom="1px solid" borderColor="gray.200">
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg">Notifications</Text>
          </Flex>
          <Text fontSize="sm" color="gray.500">You have {unreadCount} unread notifications</Text>
        </Box>
        <Box maxH="400px" overflowY="auto">
          {notifications.length === 0 ? (
            <Box p={4} textAlign="center">
              <Text color="gray.500">No notifications</Text>
            </Box>
          ) : (
            notifications.map(notification => (
              <MenuItem key={notification.id} onClick={() => handleMarkAsRead(notification.id)}>
                <VStack align="start" spacing={1} w="full" display="flex" flexDirection="column">
                  <Flex justify="space-between" w="full">
                    <Text fontWeight={notification.read ? 'normal' : 'bold'}>{notification.message}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </Text>
                  </Flex>
                  {!notification.read && (
                    <Badge colorScheme="blue" borderRadius="full">New</Badge>
                  )}
                </VStack>
              </MenuItem>
            ))
          )}
        </Box>
        <Box p={2} borderTop="1px solid" borderColor="gray.200">
          <Button size="sm" colorScheme="red" onClick={handleClearAll}>Clear All</Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default Notification;
