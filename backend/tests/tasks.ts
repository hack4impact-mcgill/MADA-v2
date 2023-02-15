// import { describe, it, beforeEach } from '@jest/globals';
// import { TaskEntity } from '../src/entities/TaskEntity';
// import { AppDataSource } from '../src/data-source';
// const supertest = require('supertest');
// import TaskEntityHelper from './task.utils';
// import DataSourceHelper from './data.utils';

// import app from '../src/app';
// const request = supertest(app);

// describe('Tasks tests', () => {
//   const taskRepository = AppDataSource.getRepository(TaskEntity);
//   const taskHelper = new TaskEntityHelper(taskRepository);

// // Before performing any tests, sets up the datasource and clears it
// beforeAll(async () => {
//   await DataSourceHelper.setupDataSource()
//   await DataSourceHelper.clearDataSource()
// })

// // After performing all the tests, destroys the datasource
// afterAll(async () => {
//     await DataSourceHelper.destroyDataSource();
// })

// // After each test, clears the datasource
// afterEach(async () => {
//     await DataSourceHelper.clearDataSource()
// });

// it('should update test', async () => {
//   const savedTask = await taskHelper.createTask('April 20, 2001 04:20:00', [], false);
//   const res = await request.put('/api/tasks/'+savedTask.id).send({isCompleted: true});
//   expect(res.statusCode).toBe(200);
//   expect(res._body.task.isCompleted).toBe(true);
// });
// });
