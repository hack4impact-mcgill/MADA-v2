import {describe, it, beforeEach} from '@jest/globals';
import { TaskEntity } from '../src/entities/TaskEntity';
import { AppDataSource } from '../src/data-source';
import TaskController from '../src/controllers/tasks';
import * as request from 'supertest';

import app from '../src/index';

describe('Tasks tests', () => {
  const taskController: TaskController = new TaskController();
  const taskRepository = AppDataSource.getRepository(TaskEntity);
  
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = await AppDataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    }
  });

  it('should update test', async () => {
    // save a new task
    const TaskRepository = AppDataSource.getRepository(TaskEntity);
    const newTask = new TaskEntity();
    newTask.deliveryTime = new Date('April 20, 2001 04:20:00');
    newTask.deliveries = [];
    newTask.isCompleted = false;
    const savedTask = await TaskRepository.save(newTask);
    const res = await request(app).put('/api/tasks/'+savedTask.id).send({isCompleted: true});
    expect(res.statusCode).toBe(200);
    expect(res._body.task.isCompleted).toBe(true);
  });
});
