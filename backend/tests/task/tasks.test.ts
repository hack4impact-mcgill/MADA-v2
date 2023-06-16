import { describe, it } from '@jest/globals';
import { TaskEntity } from '../../src/entities/TaskEntity';
import { AppDataSource } from '../../src/data-source';
import * as request from 'supertest';
import TaskEntityHelper from './task.utils';
import DataSourceHelper from '../data.utils';

import app from '../../src/app';
import { StatusCode } from '../../src/controllers/statusCode';
import MealDeliveryEntityHelper from '../mealDelivery/mealDelivery.utils';
import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';
import { MealType, ProgramType } from '../../src/entities/types';

describe('Tasks tests', () => {
  const taskRepository = AppDataSource.getRepository(TaskEntity);
  const taskHelper = new TaskEntityHelper(taskRepository);
  const mealDeliveryHelper = new MealDeliveryEntityHelper(
    AppDataSource.getRepository(MealDeliveryEntity)
  );

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
    const res = await request(app).get('/api/tasks/1');
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body).toEqual({
      task: null
    });
  });

  it('should return a task', async () => {
    const savedTask = await taskHelper.createTask([], false);
    const res = await request(app).get(`/api/tasks/${savedTask.id}`);
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      task: {
        id: savedTask.id,
        isCompleted: false,
        date: null,
        deliveries: []
      }
    });
  });

  it('should return tasks', async () => {
    const savedTaskOne = await taskHelper.createTask([], false);
    const savedTaskTwo = await taskHelper.createTask([], false);
    const res = await request(app).get(`/api/tasks`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      tasks: [
        {
          id: expect.any(Number),
          date: null,
          isCompleted: false,
          deliveries: [],
          volunteer: null
        },
        {
          id: expect.any(Number),
          date: null,
          isCompleted: false,
          deliveries: [],
          volunteer: null
        }
      ]
    });
  });

  // Will be replaced with create task from route
  //   it('should create a task', async () => {
  //     const date: Date = new Date('April 20, 2001 04:20:00');
  //     const res = await request(app).put(`/api/tasks`).send({
  //       date: date.toISOString(),
  //       isCompleted: false,
  //     });
  //     expect(res.statusCode).toBe(StatusCode.OK);
  //     expect(res.body).toEqual({
  //       task: {
  //         id: expect.any(Number),
  //         date: date.toISOString(),
  //         isCompleted: false,
  //         deliveries: []
  //       }
  //     });
  //   });

  it('should delete task', async () => {
    await DataSourceHelper.clearDataSource();
    const date: Date = new Date('April 20, 2001 04:20:00');
    const savedTask = await taskHelper.createTask([], false);
    const res = await request(app).delete(`/api/tasks/${savedTask.id}`);
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({});
  });
});
