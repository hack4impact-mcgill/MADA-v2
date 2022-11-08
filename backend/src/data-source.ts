import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ClientEntity } from './entities/ClientEntity';
import { UserEntity } from './entities/UserEntity';
import { AdminEntity } from './entities/AdminEntity';
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
  entities: [UserEntity, ClientEntity, AdminEntity,  VolunteerEntity],
  migrations: [],
  subscribers: []
});
