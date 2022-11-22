import * as express from 'express';
import { mealDeliveryRouter } from './mealDelivery.route';

// Create a router object
export const api = express.Router();

// Adds the routes from todo.route to this router
api.use(mealDeliveryRouter);