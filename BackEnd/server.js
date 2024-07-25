


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 5000;
const prisma = new PrismaClient();

const authRoutes = require('./routes/authRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const subTasksRoutes = require('./routes/subtasksRoutes'); 

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes); 
app.use('/api/projects', projectsRoutes); 
app.use('/api', subTasksRoutes); 

app.listen(port, async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    console.log(`Server running on http://localhost:${port}`);
});
