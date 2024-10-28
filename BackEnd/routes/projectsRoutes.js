const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.post('/', projectsController.createProject);
router.post('/:projectId/tasks',projectsController.createTask)
router.get('/', projectsController.getProjects);
router.get('/:projectId', projectsController.getProjectById);
router.put('/:projectId', projectsController.updateProject);
router.delete('/:projectId', projectsController.deleteProject);

module.exports = router;
