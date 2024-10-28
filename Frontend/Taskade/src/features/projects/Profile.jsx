



import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, HStack, Text, Input, Image, Divider, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios.get('/api/auth/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleEditProfile = () => {
    axios.put('/api/auth/profile', user, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
      .then(response => {
        setUser(response.data);
        setEditing(false);
        toast({
          title: 'Success',
          description: 'Profile updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to update profile.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios.put('/api/auth/change-password', { newPassword }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
      .then(response => {
        toast({
          title: 'Success',
          description: 'Password changed successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to change password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDeleteAccount = () => {
    axios.delete('/api/auth/delete-account', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
      .then(response => {
        toast({
          title: 'Success',
          description: 'Account deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        localStorage.removeItem('token'); 
        navigate('/login');
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to delete account.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    toast({
      title: 'Success',
      description: 'Logged out successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/login'); 
  };

  return (
    <Box p={5} display="flex" justifyContent="center">
      <VStack spacing={4} align="start" maxW="500px">
        <HStack spacing={4} w="100%" justifyContent="center" alignItems="center">
          <Image
            boxSize="80px"
            borderRadius="full"
            src={user.profilePicture || 'default-profile-picture.png'}
            alt="Profile Picture"
          />
          <VStack align="start" flex="1">
            {editing ? (
              <>
                <Input
                  size="sm"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Input
                  size="sm"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <HStack spacing={2}>
                  <Button colorScheme="blue" size="sm" onClick={handleEditProfile}>Save Changes</Button>
                  <Button size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                </HStack>
              </>
            ) : (
              <>
                <Text fontSize="lg">{user.name}</Text>
                <Text fontSize="sm">{user.email}</Text>
                <Button colorScheme="blue" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
              </>
            )}
          </VStack>
        </HStack>

        <Divider />

        <VStack align="start" spacing={4} w="100%">
          <Text fontSize="lg">Change Password</Text>
          <Input
            size="sm"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            size="sm"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button colorScheme="blue" size="sm" onClick={handleChangePassword}>Change Password</Button>
        </VStack>

        <Divider />

        <HStack spacing={4} w="100%" justifyContent="flex-end">
          <Button colorScheme="red" size="sm" onClick={handleDeleteAccount}>Delete Account</Button>
          <Button colorScheme="blue" size="sm" onClick={handleLogout}>Logout</Button>
        </HStack>
      </VStack>
      <ToastContainer />
    </Box>
  );
};

export default Profile;

