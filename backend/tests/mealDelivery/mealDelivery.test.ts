import { describe, it } from '@jest/globals';
import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';
import { AppDataSource } from '../../src/data-source';
import * as request from 'supertest';
import MealDeliveryEntityHelper from './mealDelivery.utils';
import DataSourceHelper from './../data.utils';

import app from '../../src/app';
import { StatusCode } from '../../src/controllers/statusCode';
import { MealType, ProgramType } from '../../src/entities/types';

describe('Tasks tests', () => {
  const mealDeliveryRepository =
    AppDataSource.getRepository(MealDeliveryEntity);
  const mealDeliveryHelper = new MealDeliveryEntityHelper(
    mealDeliveryRepository
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

  it('should return meal delivery not found', async () => {
    const res = await request(app).get('/api/meal_delivery/1');
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body).toEqual({
      mealDelivery: null
    });
  });

  it('should return a mealDelivery', async () => {
    const savedMealDelivery = await mealDeliveryHelper.createMealDelivery(
      false,
      1,
      MealType.NOFISH,
      ProgramType.MAP,
      null,
      null
    );
    // console.log(savedMealDelivery);
    const res = await request(app).get(
      `/api/meal_delivery/${savedMealDelivery.id}`
    );
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      mealDelivery: {
        id: savedMealDelivery.id,
        mealType: MealType.NOFISH,
        isCompleted: false,
        routePosition: 1,
        client: null,
        task: null,
        program: ProgramType.MAP
      }
    });
  });

// Should be auto created from route
//   it('should create a meal delivery', async () => {
//     const res = await request(app).put(`/api/meal_delivery`).send({
//       mealType: MealType.NOFISH,
//       task: null
//     });
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({
//       mealDelivery: {
//         id: expect.any(Number),
//         mealType: MealType.NOFISH,
//         isCompleted: false,
//         routePosition: 1,
//         client: null,
//         task: null,
//         program: ProgramType.MAP
//       }
//     });
//   });

//   it('should update a meal delivery', async () => {
//     const savedMealDelivery = await mealDeliveryHelper.createMealDelivery(
//       false,
//       1,
//       MealType.NOFISH,
//       ProgramType.MAP,
//       null,
//       null
//     );
//     const res = await request(app)
//       .put(`/api/meal_delivery/${savedMealDelivery.id}`)
//       .send({
//         quantity: 2,
//         mealType: 'lunch',
//         task: null
//       });
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({
//       mealDelivery: {
//         id: expect.any(Number),
//         quantity: 2,
//         mealType: 'lunch',
//         task: null
//       }
//     });
//   });

  it('should delete meal delivery', async () => {
    const savedMealDelivery = await mealDeliveryHelper.createMealDelivery(
      false,
      1,
      MealType.NOFISH,
      ProgramType.MAP,
      null,
      null
    );
    const res = await request(app).delete(
      `/api/meal_delivery/${savedMealDelivery.id}`
    );
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({});
  });
});
