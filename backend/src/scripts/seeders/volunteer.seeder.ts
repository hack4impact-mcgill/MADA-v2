import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { VolunteerEntity } from '../../entities/VolunteerEntity';
import { faker } from '@faker-js/faker';
import { generateTask } from './task.seeder';
import { generateStaffUser } from './user';

const generateVolunteer = async () => {
  const volunteer = (await generateStaffUser()) as any;
  volunteer.startDate = faker.date.past(2);
  volunteer.profilePicture = faker.internet.avatar();
  volunteer.availabilities = [];
  return volunteer;
};

const generateVolunteers = async (num: number) => {
  const volunteers: VolunteerEntity[] = [];
  for (let i = 0; i < num; i++) {
    const v = await generateVolunteer();
    volunteers.push(v);
  }
  return volunteers;
};

const generateTasks = (
  dataSource: DataSource,
  volunteers: VolunteerEntity[]
) => {
  volunteers.forEach(async (volunteer) => {
    const num = Math.floor(Math.random() * 4);
    for (let i = 0; i <= num; i++) {
      await generateTask(dataSource, volunteer);
    }
  });
};

export default class VolunteerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(VolunteerEntity);
    const volunteers = await generateVolunteers(10);
    await repository.insert(volunteers);
    generateTasks(dataSource, volunteers);
  }
}
