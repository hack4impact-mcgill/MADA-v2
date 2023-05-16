import {jest, describe, it, beforeAll, afterAll, afterEach, expect} from '@jest/globals';
import * as request from 'supertest';
import DataSourceHelper from '../data.utils';
import ClientEntityHelper from './client.utils';
import { AppDataSource } from '../../src/data-source';
import {ClientEntity} from '../../src/entities/ClientEntity';
import app from '../../src/app';
import { StatusCode } from '../../src/controllers/statusCode';
import {MealType} from '../../src/entities/types';

describe('Client tests', () => {
    const ClientRepository = AppDataSource.getRepository(ClientEntity);

    const clientHelper = new ClientEntityHelper(ClientRepository);


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

  // GET /api/clients
  it('should return no clients', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      clients: []
    });
  });

  // GET /api/clients/
  it('should return all clients', async () => {
    const client1 = await clientHelper.createClient({
        name: 'Test Client',
        email: 'email@email.com',
        phoneNumber: '1234567890',
        address: '1234 Test Address',
        mealType: MealType.NOFISH,
        sts: true,
        map: true
    });
    const client2 = await clientHelper.createClient({
        name: 'Test Client2',
        email: 'email2@email.com',
        phoneNumber: '0987654321',
        address: '1234 Test Address2',
        mealType: MealType.NOMEAT,
        sts: false,
        map: true
    });
    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      clients: [
        {
            id: 1,
            name: 'Test Client',
            email: 'email@email.com',
            phoneNumber: '1234567890',
            address: '1234 Test Address',
            mealType: MealType.NOFISH,
            sts: true,
            map: true
        },
        {
            id: 2,
            name: 'Test Client2',
            email: 'email2@email.com',
            phoneNumber: '0987654321',
            address: '1234 Test Address2',
            mealType: MealType.NOMEAT,
            sts: false,
            map: true
        }
      ]
    });
  });

  // GET /api/clients/:id
  it('should return a client', async () => {
    const client1 = await clientHelper.createClient({
        name: 'Test Client',
        email: 'email@email.com',
        phoneNumber: '1234567890',
        address: '1234 Test Address',
        mealType: MealType.NOFISH,
        sts: true,
        map: true
    });
    const res = await request(app).get(`/api/clients/${client1.id}`);
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
        client: {
            id: 1,
            name: 'Test Client',
            email: 'email@email.com',
            phoneNumber: '1234567890',
            address: '1234 Test Address',
            mealType: MealType.NOFISH,
            sts: true,
            map: true
        },
    });
  });
});
