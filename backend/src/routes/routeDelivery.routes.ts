import * as express from 'express';
import RouteDeliveryController from '../controllers/routeDelivery';
// import MealDeliveryController from '../controllers/mealDelivery';

// Create a router object
export const router = express.Router();
const routeDeliveryController = new RouteDeliveryController();

router.get('/route_delivery/', routeDeliveryController.getRouteDeliveries);
