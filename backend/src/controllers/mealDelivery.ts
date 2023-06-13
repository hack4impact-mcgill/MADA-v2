import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';
import { ClientEntity } from '../entities/ClientEntity';

export default class MealDeliveryController {
  private MealDeliveryRepository =
    AppDataSource.getRepository(MealDeliveryEntity);
  private TaskRepository = AppDataSource.getRepository(TaskEntity);
  private ClientRepository = AppDataSource.getRepository(ClientEntity);

  getMealDeliveries = async (request: Request, response: Response) => {
    const meals = await this.MealDeliveryRepository.find({});
    response.status(StatusCode.OK).json({ meals: meals });
  };

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
    mealDelivery
      ? response.status(StatusCode.OK).json({ mealDelivery: mealDelivery })
      : response.status(StatusCode.BAD_REQUEST).json({ mealDelivery: null });
  };

  updateOrCreateMealDelivery = async (request: Request, response: Response) => {
    if (!request.params.id) {
      const newMealDelivery = new MealDeliveryEntity();
      newMealDelivery.mealType = request.body.mealType;
      newMealDelivery.isCompleted = request.body.isCompleted;
      newMealDelivery.routePosition = request.body.routePosition;
      newMealDelivery.program = request.body.program;
      newMealDelivery.task = request.body.task
        ? await this.TaskRepository.findOneBy({
            id: request.body.task.id
          })
        : null;
      newMealDelivery.client = request.body.client
        ? await this.ClientRepository.findOneBy({
            id: request.body.client.id
          })
        : null;

      await this.MealDeliveryRepository.save(newMealDelivery);
      const mealDelivery = await this.MealDeliveryRepository.findOne({
        where: {
          id: newMealDelivery.id
        },
        relations: {
          task: true,
          client: true
        }
      });
      response.status(StatusCode.OK).json({ mealDelivery: mealDelivery });
    } else {
      await this.MealDeliveryRepository.save({
        id: parseInt(request.params.id),
        isCompleted: request.body.isCompleted,
        routePosition: request.body.routePosition,
        mealType: request.body.mealType,
        program: request.body.program,
        task: request.body.task
          ? await this.TaskRepository.findOneBy({
              id: parseInt(request.body.task.id)
            })
          : null,
        client: request.body.client
          ? await this.ClientRepository.findOneBy({
              id: parseInt(request.body.client.id)
            })
          : null
      });
      const mealDelivery = await this.MealDeliveryRepository.findOne({
        where: {
          id: parseInt(request.params.id)
        },
        relations: {
          task: true,
          client: true
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
