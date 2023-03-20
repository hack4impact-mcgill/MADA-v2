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

  it('should create a task', async () => {
    const date: Date = new Date('April 20, 2001 04:20:00');
    const res = await request(app).put(`/api/tasks`).send({
      deliveryTime: date.toISOString(),
      isCompleted: false,
      deliveries: []
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      task: {
        id: expect.any(Number),
        deliveryTime: date.toISOString(),
        isCompleted: false,
        deliveries: []
      }
    });
  });

  it('should update a test', async () => {
    const date: Date = new Date('April 20, 2001 04:20:00');
    const newDate: Date = new Date('April 21, 2001 04:20:00');
    const newMealDelivery = await mealDeliveryHelper.createMealDelivery(
      1,
      'breakfast',
      null
    );
    const savedTask = await taskHelper.createTask(
      date.toISOString(),
      [newMealDelivery],
      false
    );
    const res = await request(app).put(`/api/tasks/${savedTask.id}`).send({
      deliveryTime: newDate.toISOString(),
      isCompleted: true,
      deliveries: []
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      task: {
        id: expect.any(Number),
        deliveryTime: newDate.toISOString(),
        isCompleted: true,
        deliveries: []
      }
    });
    // make sure mealDelivery's task is unset
    expect(newMealDelivery.task).toBeNull;
  });

  it('should delete task', async () => {
    await DataSourceHelper.clearDataSource();
    const date: Date = new Date('April 20, 2001 04:20:00');
    const savedTask = await taskHelper.createTask(
      date.toISOString(),
      [],
      false
    );
    const res = await request(app).delete(`/api/tasks/${savedTask.id}`);
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({});
  });
});
