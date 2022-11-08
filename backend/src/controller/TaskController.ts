import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TaskEntity } from '../entities/TaskEntity';

export class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);

  // GET all tasks from database
  getAllTasks = async (request: Request, response: Response) => {
    try {
      const tasks = await this.TaskRepository.find();
      response.status(200).json({ tasks: tasks });
    } catch {
      // internal server error, cannot query tasks
      response.status(500);
    }
  };

  // GET tasks filtered with parameters
  getFilteredTasks = async (request: Request, response: Response) => {
    const id = request.params.id; //assuming the URI will be /tasks/:id using path parameters
  };

  // POST create a task
}
