import { Request, Response } from 'express';
import { AppDataSource } from '../src/data-source';
import { TaskEntity } from '../src/entities/TaskEntity';

export default class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);

  updateTodo = async (request: Request, response: Response) => {
    const taskToUpdate = await this.TaskRepository.findOneBy({
      id: parseInt(request.params.id)
    });
    const task = await this.TaskRepository.save({
      ...taskToUpdate,
      ...request.body
    });
    response.status(200).json({ task: task });
  };
}
