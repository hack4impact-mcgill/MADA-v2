import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { ClientEntity } from '../entities/ClientEntity';
import { VolunteerEntity } from '../entities/VolunteerEntity';
import { StatusCode } from './statusCode';
import { RouteDeliveryEntity } from '../entities/RouteDeliveryEntity';

export default class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);
  private MealDeliveryRepository =
    AppDataSource.getRepository(MealDeliveryEntity);
  private ClientRepository = AppDataSource.getRepository(ClientEntity);
  private VolunteerRepository = AppDataSource.getRepository(VolunteerEntity);
  private RouteDeliveryRepository =
    AppDataSource.getRepository(RouteDeliveryEntity);

  getTask = async (request: Request, response: Response) => {
    const task = await this.TaskRepository.findOne({
      where: {
        id: parseInt(request.params.id)
      },
      relations: {
        deliveries: {
          client: true
        },
        volunteer: true
      }
    });
    task
      ? response.status(StatusCode.OK).json({ task: task })
      : response.status(StatusCode.BAD_REQUEST).json({ task: null });
  };

  getTasks = async (request: Request, response: Response) => {
    const task = await this.TaskRepository.find({
      relations: {
        deliveries: {
          client: true
        },
        volunteer: true
      }
    });
    response.status(StatusCode.OK).json({ tasks: task });
  };

  createAllTasksFromRoute = async (request: Request, response: Response) => {
    const routes = await this.RouteDeliveryRepository.find({});

    // Create tasks from routeDelivery items
  };

  createTask = async (request: Request, response: Response) => {
    const newTask = new TaskEntity();
    newTask.deliveries = [];
    newTask.isCompleted = false;

    newTask.volunteer = await this.VolunteerRepository.findOne({
      where: { id: request.body.volunteerId }
    });

    const savedTask = await this.TaskRepository.save(newTask);

    request.body.meals?.forEach(async (meal) => {
      const newMeal = new MealDeliveryEntity();
      newMeal.mealType = meal.type;
      newMeal.task = savedTask;
      const foundClient = await this.ClientRepository.findOne({
        where: { id: meal.clientId }
      });
      newMeal.client = foundClient;
      await this.MealDeliveryRepository.save(newMeal);
    });

    const task = await this.TaskRepository.findOne({
      where: { id: savedTask.id }
    });

    response.status(StatusCode.OK).json({ task: task });
  };

  updateOrCreateTask = async (request: Request, response: Response) => {
    // create
    if (!request.params.id) {
      const newTask = new TaskEntity();
      newTask.deliveries = [];
      newTask.date = request.body.date;
      newTask.isCompleted = request.body.isCompleted;
      newTask.deliveries = await Promise.all(
        request.body.deliveries.map(async (d) =>
          this.MealDeliveryRepository.findOneBy({
            id: parseInt(d.id)
          })
        )
      );
      await this.TaskRepository.save(newTask);
      const savedTask = await this.TaskRepository.findOne({
        where: {
          id: newTask.id
        },
        relations: {
          deliveries: true
        }
      });

      response.status(StatusCode.OK).json({ task: savedTask });
    } else {
      // update
      const taskToUpdate = await this.TaskRepository.findOneBy({
        id: parseInt(request.params.id)
      });
      taskToUpdate.isCompleted = request.body.isCompleted;
      taskToUpdate.deliveries = await Promise.all(
        request.body.deliveries.map(async (d) =>
          this.MealDeliveryRepository.findOneBy({
            id: parseInt(d.id)
          })
        )
      );
      const updatedTask = await this.TaskRepository.save(taskToUpdate);
      const savedTask = await this.TaskRepository.findOne({
        where: {
          id: updatedTask.id
        },
        relations: {
          deliveries: true
        }
      });
      response.status(StatusCode.OK).json({ task: savedTask });
    }
  };

  deleteTask = async (request: Request, response: Response) => {
    const taskDeleted = await this.TaskRepository.delete({
      id: parseInt(request.params.id)
    });
    response.status(StatusCode.OK).json({});
  };
}
