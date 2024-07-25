



import React from 'react';
import { Box, Grid, Heading, Text, VStack, Button, Image, HStack } from '@chakra-ui/react';

const AboutUs = () => {
    return (
        <VStack spacing={10} align="center" p={8} bg="gray.100" minHeight="100vh">
            <HStack spacing={8} mb={10} align="center" textAlign="center">
              
                <Box>
                    <Heading as="h1" size="2xl" mb={6} color="blue.500">
                        About Taskade
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        Welcome to Taskade, your all-in-one task management and productivity platform. We are committed to helping you organize your tasks, projects, and goals efficiently.
                    </Text>
                </Box>
            </HStack>

            <Box bg="white" p={8} shadow="md" borderRadius="md" maxW="1200px" w="full" mb={10}>
                <Heading as="h2" size="lg" mb={6} color="teal.500">Our Mission</Heading>
                <Text fontSize="md" color="gray.700">
                    At Taskade, our mission is to provide a seamless and intuitive task management experience that helps individuals and teams stay productive and organized. We believe in empowering users with the tools they need to achieve their goals and drive success.
                </Text>
            </Box>

            <Box bg="white" p={8} shadow="md" borderRadius="md" maxW="1200px" w="full" mb={10}>
                <Heading as="h2" size="lg" mb={6} color="teal.500">Meet the Team</Heading>
                <Grid templateColumns="1fr 1fr 1fr" gap={8}>
                    <Box bg="gray.200" p={6} borderRadius="md" textAlign="center">
                        <Image 
                            borderRadius="full" 
                            boxSize="150px" 
                            src="data:image/jpeg;base64,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"

                            alt="Team Member 1" 
                            mx="auto" 
                            mb={4} 
                        />
                        <Heading as="h3" size="md" mb={2} color="teal.600">Alice Smith</Heading>
                        <Text fontSize="md" color="gray.600" mt={2}>Founder & CEO</Text>
                    </Box>

                    <Box bg="gray.200" p={6} borderRadius="md" textAlign="center">
                        <Image 
                            borderRadius="full" 
                            boxSize="150px" 
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAdDRs63ixPtS757Hrvl1LoG6Oy2GO0-0EMQ&s"

                            alt="Team Member 2" 
                            mx="auto" 
                            mb={4} 
                        />
                        <Heading as="h3" size="md" mb={2} color="teal.600">Bob Johnson</Heading>
                        <Text fontSize="md" color="gray.600" mt={2}>CTO</Text>
                    </Box>

                    <Box bg="gray.200" p={6} borderRadius="md" textAlign="center">
                        <Image 
                            borderRadius="full" 
                            boxSize="150px" 
                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41TAwR-s8K5gTwqMc6URdmj443gicBAzAzA&s"

                            alt="Team Member 3" 
                            mx="auto" 
                            mb={4} 
                        />
                        <Heading as="h3" size="md" mb={2} color="teal.600">Charlie Davis</Heading>
                        <Text fontSize="md" color="gray.600" mt={2}>Product Manager</Text>
                    </Box>
                </Grid>
            </Box>

            {/* Contact Us Section */}
            <Box bg="white" p={8} shadow="md" borderRadius="md" maxW="1200px" w="full">
                <Heading as="h2" size="lg" mb={6} color="teal.500">Contact Us</Heading>
                <Text fontSize="md" color="gray.700" mb={4}>
                    We would love to hear from you! Whether you have questions, feedback, or suggestions, please feel free to reach out to us. Our team is here to assist you and ensure you have the best experience with Taskade.
                </Text>
                <Text fontSize="md" color="gray.600" mb={4}>
                    <strong>Email:</strong> 
                    <a href="mailto:support@taskade.com" style={{ color: 'blue' }}>
                        support@taskade.com
                    </a>
                </Text>
                <Text fontSize="md" color="gray.600" mb={4}>
                    <strong>Phone:</strong> +1 (123) 456-7890
                </Text>
                <Text fontSize="md" color="gray.600" mb={4}>
                    <strong>Address:</strong> 123 Taskade Lane, Productivity City, PC 45678
                </Text>
                <Button mt={6} colorScheme="teal" variant="outline">
                    Get in Touch
                </Button>
            </Box>

            {/* Footer */}
            <Box mt={10} textAlign="center">
                <Text fontSize="sm" color="gray.500">
                    &copy; {new Date().getFullYear()} Taskade. All rights reserved.
                </Text>
            </Box>
        </VStack>
    );
};

export default AboutUs;


