import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);

  getTask = async (request: Request, response: Response) => {
    // console.log(request.params);
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

  updateOrAddTask = async (request: Request, response: Response) => {
    const taskToUpdate = await this.TaskRepository.findOneBy({
      id: parseInt(request.params.id)
    });
    const task = await this.TaskRepository.save({
      ...taskToUpdate,
      ...request.body
    });
    response.status(StatusCode.OK).json({ task: task });
  };

  deleteTask = async (request: Request, response: Response) => {
    const taskDeleted = await this.TaskRepository.delete({
      id: parseInt(request.params.id)
    });
    response.status(StatusCode.OK).json({});
  };
}
