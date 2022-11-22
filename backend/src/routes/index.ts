import * as express from 'express';

import { volunteerRouter } from './volunteer.route';

// Create a router object
export const api = express.Router();

// Adds the routes from todo.route to this router
api.use(volunteerRouter);
