import * as express from 'express';
import MealDeliveryController from '../controllers/mealDelivery';
// import MealDeliveryController from '../controllers/mealDelivery';

// Create a router object
export const router = express.Router();
const mealDeliveryController = new MealDeliveryController();

router.get('/meal_delivery/', mealDeliveryController.getMealDeliveries);
router.get('/meal_delivery/:id', mealDeliveryController.getMealDelivery);
router.put(
  '/meal_delivery/:id',
  mealDeliveryController.updateOrCreateMealDelivery
);
router.put(
  '/meal_delivery/',
  mealDeliveryController.updateOrCreateMealDelivery
);
router.delete('/meal_delivery/:id', mealDeliveryController.deleteMealDelivery);
