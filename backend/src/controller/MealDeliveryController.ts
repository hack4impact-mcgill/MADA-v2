import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';

export class MealDeliveryController {
  private MealDeliveryRepository = AppDataSource.getRepository(MealDeliveryEntity);


    getMealDelivery = async (request: Request, response: Response) => {
        try {
            const mealDelivery = await this.MealDeliveryRepository.find();
            response.status(200).json({ mealDelivery });
        } catch (e) {
            console.log(e);
            response.status(400);
        }
    };

    createMealDelivery = async (request: Request, response: Response) => {
        try {
          const mealDelivery = await this.MealDeliveryRepository.save(request.body);
          response.status(200).json({ mealDelivery }); 
        } catch (e) {
          console.log(e);
          response.status(400);
        }
    };

    updateMealDelivery = async (request: Request, response: Response) => {
        try {
            const mealDeliveryToUpdate = await this.MealDeliveryRepository.findOneBy({
            id: parseInt(request.params.id)
            });
            if (mealDeliveryToUpdate == null)
                throw new Error('The mealDelivery to delete does not exist');

            const mealDelivery = await this.MealDeliveryRepository.save({
                ...mealDeliveryToUpdate,
                ...request.body
                }
            );
            response.status(200).json({ mealDelivery }); 
        } catch (e) {
          console.log(e);
          response.status(400);
        }
    };

    deleteMealDelivery = async (request: Request, response: Response) => {
        try {
          const mealDeliveryToDelete = await this.MealDeliveryRepository.findOneBy({
            id: parseInt(request.params.id)
          });
          if (mealDeliveryToDelete == null)
            throw new Error('The mealDelivery to delete does not exist');
          const mealDelivery = await this.MealDeliveryRepository.delete(mealDeliveryToDelete);
          response.status(200).json({ mealDelivery });
        } catch (e) {
          console.log(e);
          response.status(400);
        }
      };




}
