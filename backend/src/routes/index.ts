import * as express from 'express';
import { router as tasks } from './task.routes';
import { adminRouter} from "./admin.route";

// Create a router object
export const api = express.Router();

// Adds the routes from todo.route to this router
api.use(tasks);
api.use(adminRouter);
