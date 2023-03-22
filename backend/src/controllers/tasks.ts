import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);
  private MealDeliveryRepository =
    AppDataSource.getRepository(MealDeliveryEntity);

  getTask = async (request: Request, response: Response) => {
    const task = await this.TaskRepository.findOne({
      where: {
        id: parseInt(request.params.id)
      },
      relations: {
        deliveries: true
      }
    });
    task
      ? response.status(StatusCode.OK).json({ task: task })
      : response.status(StatusCode.BAD_REQUEST).json({ task: null });
  };

  getTasks = async (request: Request, response: Response) => {
    const task = await this.TaskRepository.find({
      relations: {
        deliveries: true
      }
    });
    response.status(StatusCode.OK).json({ tasks: task });
  };

  createTask = async (request: Request, response: Response) => {
    const newTask = new TaskEntity();
    newTask.deliveryTime = new Date(request.body.date);
    newTask.deliveries = [];
    newTask.isCompleted = request.body.isCompleted;
    const savedTask = await this.TaskRepository.save(newTask);
    response.status(StatusCode.OK).json({ task: savedTask });
  };

  updateOrCreateTask = async (request: Request, response: Response) => {
    // create
    if (!request.params.id) {
      const newTask = new TaskEntity();
      newTask.deliveryTime = new Date(request.body.deliveryTime);
      newTask.deliveries = [];
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
      taskToUpdate.deliveryTime = new Date(request.body.deliveryTime);
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
