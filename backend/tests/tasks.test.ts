import { describe, it } from '@jest/globals';
import { TaskEntity } from '../src/entities/TaskEntity';
import { AppDataSource } from '../src/data-source';
import * as request from 'supertest';
import TaskEntityHelper from './task.utils';
import DataSourceHelper from './data.utils';

import app from '../src/app';
import { StatusCode } from '../src/controllers/statusCode';

describe('Tasks tests', () => {
  const taskRepository = AppDataSource.getRepository(TaskEntity);
  const taskHelper = new TaskEntityHelper(taskRepository);

  // Before performing any tests, sets up the datasource and clears it
  beforeAll(async () => {
    await DataSourceHelper.setupDataSource();
    await DataSourceHelper.clearDataSource();
  });

  // After performing all the tests, destroys the datasource
  afterAll(async () => {
    await DataSourceHelper.destroyDataSource();
  });

  // After each test, clears the datasource
  afterEach(async () => {
    await DataSourceHelper.clearDataSource();
  });

  it('should return task not found', async () => {
    await DataSourceHelper.clearDataSource();
    const res = await request(app).get('/api/tasks/1');
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body).toEqual({
      task: null
    });
  });

  it('should return a task', async () => {
    const date: Date = new Date('April 20, 2001 04:20:00');
    const savedTask = await taskHelper.createTask(
      date.toISOString(),
      [],
      false
    );
    const res = await request(app).get(`/api/tasks/${savedTask.id}`);
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      task: {
        id: savedTask.id,
        deliveryTime: date.toISOString(),
        isCompleted: false,
        deliveries: []
      }
    });
  });

  // it('should update test', async () => {
  //   const savedTask = await taskHelper.createTask(
  //     'April 20, 2001 04:20:00',
  //     [],
  //     false
  //   );
  //   const res = await request
  //     .put('/api/tasks/' + savedTask.id)
  //     .send({ isCompleted: true });
  //   expect(res.statusCode).toBe(200);
  //   expect(res._body.task.isCompleted).toBe(true);
  // });
});
