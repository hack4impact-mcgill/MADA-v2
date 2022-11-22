import * as express from "express";
import { MealDeliveryController } from "../controller/MealDeliveryController";

// Create a router object
export const mealDeliveryRouter = express.Router();

// Create an instance of the MealDeliveryController
const mealDeliveryController = new MealDeliveryController();

// Create routes from the mealDeliveryController functions
mealDeliveryRouter.get("/mealDelivery/get/:id", mealDeliveryController.getMealDelivery);
mealDeliveryRouter.post("/mealDelivery/create", mealDeliveryController.createMealDelivery);
mealDeliveryRouter.put("/mealDelivery/update/:id", mealDeliveryController.updateMealDelivery);
mealDeliveryRouter.delete("/mealDelivery/delete/:id", mealDeliveryController.deleteMealDelivery);

