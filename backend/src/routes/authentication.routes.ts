import * as express from 'express';
import MealDeliveryController from '../controllers/mealDelivery';
import authenticationController from '../controllers/authentication';
// import MealDeliveryController from '../controllers/mealDelivery';

// Create a router object
export const router = express.Router();
const authController = new authenticationController();

router.post('/login', authController.login);
