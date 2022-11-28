import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TaskEntity } from '../entities/TaskEntity';

export class TaskController {
  private TaskRepository = AppDataSource.getRepository(TaskEntity);

  // GET all tasks from database
  getAllTasks = async (request: Request, response: Response) => {
    try {
      const tasks = await this.TaskRepository.find();
      response.status(200).json({ tasks });
    } catch {
      // internal server error, cannot query tasks
      response.status(500);
    }
  };

  // GET tasks filtered with parameters
  getFilteredTasks = async (request: Request, response: Response) => {
    try {
      const tasks = await this.TaskRepository.find({ where: request.body });
      response.status(200).json({ tasks });
    } catch {
      response.status(500);
    }
  };

  // POST create a task
  createTask = async (request: Request, response: Response) => {
    try {
      const task = await this.TaskRepository.save(request.body);
      response.status(200).json({ task });
    } catch {
      response.status(500);
    }
  };

  // GET a specific task
  getTask = async (request: Request, response: Response) => {
      try {
        const task = await this.TaskRepository.findOneBy({
          id: parseInt(request.params.id)
        });
        response.status(200).json({ task });
      } catch {
        response.status(500);
      }
    }

  // PUT update a task
  updateTask = async (request: Request, response: Response) => {
    try {
      const taskToUpdate = await this.TaskRepository.findOneBy({
        id: parseInt(request.params.id)
      });
      const task = await this.TaskRepository.save({
        ...taskToUpdate,
        ...request.body
      });
      response.status(200).json({ task });
    } catch {
      response.status(500);
    }
  };

  // DELETE a task
  deleteTask = async (request: Request, response: Response) => {
    try {
      const taskToDelete = await this.TaskRepository.findOneBy({
        id: parseInt(request.params.id)
      });
      const task = await this.TaskRepository.delete(taskToDelete);
      response.status(200).json({ task });
    } catch {
      response.status(500);
    }
  };
}
