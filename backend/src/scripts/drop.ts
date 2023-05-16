import { AppDataSource } from '../data-source';

export const drop = async () => {
  console.log('Begin initalizing data source');
  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  console.log('Dropped database');
};

drop();
