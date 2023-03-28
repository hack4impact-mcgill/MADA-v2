import { describe, it } from '@jest/globals';
import { DayOfWeek, VolunteerEntity } from '../../src/entities/VolunteerEntity';
import { AppDataSource } from '../../src/data-source';
import * as request from 'supertest';
import VolunteerEntityHelper from './volunteers.utils';
import DataSourceHelper from '../data.utils';

import app from '../../src/app';
import { StatusCode } from '../../src/controllers/statusCode';

describe('Volunteers tests', () => {
  const VolunteerRepository = AppDataSource.getRepository(VolunteerEntity);
  const volunteerHelper = new VolunteerEntityHelper(VolunteerRepository);

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

  it('should return no volunteers', async () => {
    const res = await request(app).get('/api/volunteers');
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      volunteers: []
    });
  });

  it('should return all volunteers', async () => {
    const date: Date = new Date('April 20, 2001 04:20:00');
    volunteerHelper.createVolunteer(
      'username1',
      'name1',
      'email1',
      'password1',
      123,
      date.toISOString(),
      'link to profile',
      [DayOfWeek.MONDAY]
    );
    const res = await request(app).get('/api/volunteers');
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      volunteers: [
        {
          availabilities: ['monday'],
          email: 'email1',
          id: 1,
          name: 'name1',
          phoneNumber: 123,
          profilePicture: 'link to profile',
          startDate: '2001-04-20T08:20:00.000Z',
          username: 'username1'
        }
      ]
    });
  });

  // it('should return a task', async () => {
  //   const date: Date = new Date('April 20, 2001 04:20:00');
  //   const savedVolunteer = await taskHelper.createTask(
  //     date.toISOString(),
  //     [],
  //     false
  //   );
  //   const res = await request(app).get(`/api/tasks/${savedVolunteer.id}`);
  //   expect(res.status).toBe(StatusCode.OK);
  //   expect(res.body).toEqual({
  //     task: {
  //       id: savedVolunteer.id,
  //       deliveryTime: date.toISOString(),
  //       isCompleted: false,
  //       deliveries: []
  //     }
  //   });
  // });

  // it('should return tasks', async () => {
  //   const date: Date = new Date('April 20, 2001 04:20:00');
  //   const savedVolunteerOne = await taskHelper.createTask(
  //     date.toISOString(),
  //     [],
  //     false
  //   );
  //   const savedVolunteerTwo = await taskHelper.createTask(
  //     date.toISOString(),
  //     [],
  //     false
  //   );
  //   const res = await request(app).get(`/api/tasks`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({
  //     tasks: [
  //       {
  //         id: expect.any(Number),
  //         deliveryTime: date.toISOString(),
  //         isCompleted: false,
  //         deliveries: []
  //       },
  //       {
  //         id: expect.any(Number),
  //         deliveryTime: date.toISOString(),
  //         isCompleted: false,
  //         deliveries: []
  //       }
  //     ]
  //   });
  // });

  // it('should create a task', async () => {
  //   const date: Date = new Date('April 20, 2001 04:20:00');
  //   const res = await request(app).put(`/api/tasks`).send({
  //     deliveryTime: date.toISOString(),
  //     isCompleted: false,
  //     deliveries: []
  //   });
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({
  //     task: {
  //       id: expect.any(Number),
  //       deliveryTime: date.toISOString(),
  //       isCompleted: false,
  //       deliveries: []
  //     }
  //   });
  // });

  // it('should update a test', async () => {
  //   const date: Date = new Date('April 20, 2001 04:20:00');
  //   const newDate: Date = new Date('April 21, 2001 04:20:00');
  //   const newMealDelivery = await mealDeliveryHelper.createMealDelivery(
  //     1,
  //     'breakfast',
  //     null
  //   );
  //   const savedVolunteer = await taskHelper.createTask(
  //     date.toISOString(),
  //     [newMealDelivery],
  //     false
  //   );
  //   const res = await request(app).put(`/api/tasks/${savedVolunteer.id}`).send({
  //     deliveryTime: newDate.toISOString(),
  //     isCompleted: true,
  //     deliveries: []
  //   });
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({
  //     task: {
  //       id: expect.any(Number),
  //       deliveryTime: newDate.toISOString(),
  //       isCompleted: true,
  //       deliveries: []
  //     }
  //   });
  //   // make sure mealDelivery's task is unset
  //   expect(newMealDelivery.task).toBeNull;
  // });

  // it('should delete task', async () => {
  //   await DataSourceHelper.clearDataSource();
  //   const date: Date = new Date('April 20, 2001 04:20:00');
  //   const savedVolunteer = await taskHelper.createTask(
  //     date.toISOString(),
  //     [],
  //     false
  //   );
  //   const res = await request(app).delete(`/api/tasks/${savedVolunteer.id}`);
  //   expect(res.status).toBe(StatusCode.OK);
  //   expect(res.body).toEqual({});
  // });
});
