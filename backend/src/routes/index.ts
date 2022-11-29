import * as express from 'express';

import { router as tasks } from './task.routes';

// Create a router object
export const api = express.Router();

// Adds the routes from todo.route to this router
api.use(tasks);
