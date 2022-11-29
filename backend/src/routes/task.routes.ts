import * as express from 'express';
import TaskController from '../controllers/tasks';

// Create a router object
export const router = express.Router();
const taskController = new TaskController();

router.put('/tasks/:id', taskController.updateTodo);
