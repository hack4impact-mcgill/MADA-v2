import { TaskEntity } from '../src/entities/TaskEntity';
import { AppDataSource } from '../src/data-source';
import TaskController from '../src/controllers/tasks';
import * as request from 'supertest';
import app from '../src/index';

describe('Tasks tests', () => {
  const taskController: TaskController = new TaskController();
  const taskRepository = AppDataSource.getRepository(TaskEntity);

  beforeEach(() => {
    taskRepository.clear();
  });

  it('should update test', async () => {
    // save a new task
    const TaskRepository = AppDataSource.getRepository(TaskEntity);
    const newTask = new TaskEntity();
    newTask.deliveryTime = new Date('April 20, 2001 04:20:00');
    newTask.deliveries = [];
    newTask.isCompleted = false;
    const savedTask = await TaskRepository.save(newTask);

    request(app).update();
  });
});
