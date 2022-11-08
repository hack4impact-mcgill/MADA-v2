import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { UserEntity } from './entities/UserEntity';
import { AdminEntity } from './entities/AdminEntity';
import { ExampleEntity } from './ExampleEntity';
import { VolunteerEntity } from './entities/VolunteerEntity';

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [ExampleEntity, UserEntity, AdminEntity, VolunteerEntity],
  migrations: [],
  subscribers: []
});
