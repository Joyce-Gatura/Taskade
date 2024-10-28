import React, { useState } from 'react';
import { Box, VStack, Text, Button, Radio, RadioGroup, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';

const Settings = () => {
  const { setColorMode } = useColorMode();
  const [theme, setTheme] = useState(useColorModeValue('light', 'dark'));

  const handleThemeChange = (value) => {
    setTheme(value);
    setColorMode(value);
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl">Settings</Text>
        <Text fontSize="lg">Change Theme</Text>
        <RadioGroup onChange={handleThemeChange} value={theme}>
          <Stack direction="row">
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
    </Box>
  );
};

export default Settings;
