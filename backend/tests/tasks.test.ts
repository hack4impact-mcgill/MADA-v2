import {describe, it, beforeEach} from '@jest/globals';
import { TaskEntity } from '../src/entities/TaskEntity';
import { AppDataSource } from '../src/data-source';
const supertest = require('supertest');
import TaskEntityHelper from './task.utils';

import app from '../src/app';
const request = supertest(app)

describe('Tasks tests', () => {
  const taskRepository = AppDataSource.getRepository(TaskEntity);
  const taskHelper = new TaskEntityHelper(taskRepository);
  
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
    const savedTask = await taskHelper.createTask('April 20, 2001 04:20:00', [], false);
    const res = await request.put('/api/tasks/'+savedTask.id).send({isCompleted: true});
    expect(res.statusCode).toBe(200);
    expect(res._body.task.isCompleted).toBe(true);
  });
});
