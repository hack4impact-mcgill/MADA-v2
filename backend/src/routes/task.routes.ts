import * as express from 'express';
import TaskController from '../controllers/tasks';

// Create a router object
export const router = express.Router();
const taskController = new TaskController();

router.get('/tasks/:id', taskController.getTask);
router.put('/tasks/:id', taskController.updateOrCreateTask);
router.put('/tasks/', taskController.updateOrCreateTask);
router.delete('/tasks/:id', taskController.deleteTask);
