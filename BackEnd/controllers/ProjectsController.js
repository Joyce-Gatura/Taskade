

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
    const { project_name, start_date, end_date, tasks = [], progress_percentage } = req.body;

    try {
        console.log('Request body:', req.body);

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const newProject = await prisma.project.create({
            data: {
                project_name,
                start_date: startDate,
                end_date: endDate,
                progress_percentage,
                tasks: {
                    create: tasks.map(taskContent => ({
                        content: taskContent,
                        completed: false,  
                    })),
                },
            },
            include: {
                tasks: true,
            },
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'An error occurred while creating the project' });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                tasks: true,
            },
        });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'An error occurred while fetching projects' });
    }
};

exports.getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await prisma.project.findUnique({
            where: { project_id: parseInt(projectId) },
            include: {
                tasks: true,
            },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'An error occurred while fetching the project' });
    }
};


exports.createTask = async (req, res) => {
    const { projectId } = req.params;
    const { content } = req.body;

    try {
        if (!content || typeof content !== 'string') {
            return res.status(400).json({ message: 'Invalid content' });
        }

        if (!projectId || isNaN(parseInt(projectId))) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        const newTask = await prisma.task.create({
            data: {
                content,
                project_id: parseInt(projectId),
                completed: false,
            },
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'An error occurred while creating the task' });
    }
};




exports.updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { project_name, start_date, end_date, tasks = [], progress_percentage } = req.body;

    try {
        console.log('Update request body:', req.body);

        // Convert dates to Date objects
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Update project
        const updatedProject = await prisma.project.update({
            where: { project_id: parseInt(projectId) },
            data: {
                project_name,
                start_date: startDate,
                end_date: endDate,
                progress_percentage,
                tasks: {
                    deleteMany: {},  
                    create: tasks.map(taskContent => ({
                        content: taskContent,
                        completed: false,  
                    })),
                },
            },
            include: {
                tasks: true,
            },
        });
        console.log('Updated project:', updatedProject);
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'An error occurred while updating the project' });
    }
};

exports.deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        await prisma.project.delete({
            where: { project_id: parseInt(projectId) },
        });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'An error occurred while deleting the project' });
    }
};



