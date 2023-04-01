import * as express from 'express';
import { router as tasks } from './task.routes';
import { router as mealDelivery } from './mealDelivery.routes';
import { router as volunteers } from './volunteer.routes';
import { router as client} from './client.routes';

// Create a router object
export const api = express.Router();

// Adds the routes from todo.route to this router
api.use(tasks);
api.use(mealDelivery);
api.use(volunteers);
api.use(client);
