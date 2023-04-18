import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class MealDeliveryController {
    private MealDeliveryRepository = AppDataSource.getRepository(MealDeliveryEntity);
    private TaskRepository = AppDataSource.getRepository(TaskEntity);

    getMealDelivery = async (request: Request, response: Response) => {
        const mealDelivery = await this.MealDeliveryRepository.findOne({
            where: {
                id: parseInt(request.params.id)
            },
            relations: {
                task: true,
                client: true
            }
        });
        mealDelivery ?
            response.status(StatusCode.OK).json({ mealDelivery: mealDelivery })
        :
            response.status(StatusCode.BAD_REQUEST).json({ mealDelivery: null });
    };

    updateOrCreateMealDelivery = async (request: Request, response: Response) => {
        if (!request.params.id) {
            const newMealDelivery = new MealDeliveryEntity();
            newMealDelivery.quantity = parseInt(request.body.quantity);
            newMealDelivery.mealType = request.body.mealType;
            newMealDelivery.task = request.body.task
                ? await this.TaskRepository.findOneBy({
                    id: request.body.task.id
                })
                : null;
            await this.MealDeliveryRepository.save(newMealDelivery);
            const mealDelivery = await this.MealDeliveryRepository.findOne({
                where: {
                    id: newMealDelivery.id
                },
                relations: {
                    task: true
                }
            });
            response.status(StatusCode.OK).json({ mealDelivery: mealDelivery });
        } else {
            await this.MealDeliveryRepository.save({
                id: parseInt(request.params.id),
                mealType: request.body.mealType,
                quantity: request.body.quantity,
                task: request.body.task
                ? await this.MealDeliveryRepository.findOneBy({
                    id: parseInt(request.body.task.id)
                    })
                : null
            });
            const mealDelivery = await this.MealDeliveryRepository.findOne({
                where: {
                    id: parseInt(request.params.id)
                },
                    relations: {
                    task: true
                }
            });
            response.status(StatusCode.OK).json({ mealDelivery: mealDelivery });
        }
    };

    deleteMealDelivery = async (request: Request, response: Response) => {
        const mealDeliveryDeleted = await this.MealDeliveryRepository.delete({
            id: parseInt(request.params.id)
        });
        response.status(StatusCode.OK).json({});
    };
}
