import * as express from 'express';
import RouteDeliveryController from '../controllers/routeDelivery';

// Create a router object
export const router = express.Router();
const routeDeliveryController = new RouteDeliveryController();

router.get('/route_delivery/', routeDeliveryController.getRouteDeliveries);
router.put('/route_delivery/:id/set', routeDeliveryController.setRouteNumber);
router.put('/route_delivery/:id/increment', routeDeliveryController.incrementRoutePosition);
router.put('/route_delivery/:id/decrement', routeDeliveryController.decrementRoutePosition);
