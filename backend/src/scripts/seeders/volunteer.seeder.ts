import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  VolunteerEntity,
  indexedDayOfWeek,
  indexedTimeSlots,
  TimeSlots,
  Availabilities
} from '../../entities/VolunteerEntity';
import { faker } from '@faker-js/faker';
import { generateTask } from './task.seeder';
import { generateStaffUser } from './user';
import * as bcrypt from 'bcryptjs';

const DEFAULT_VOLUNTEER = {
  password: process.env.TEST_VOLUNTEER_PASSWORD,
  email: process.env.TEST_VOLUNTEER_EMAIL
};

const generateDefaultVolunteer = async () => {
  const volunteer = (await generateStaffUser()) as any;
  volunteer.password = await bcrypt.hash(DEFAULT_VOLUNTEER.password, 10);
  volunteer.email = DEFAULT_VOLUNTEER.email;
  volunteer.startDate = faker.date.past(2);
  volunteer.profilePicture = faker.internet.avatar();
  volunteer.availabilities = generateAvailabilities();
  volunteer.availabilitiesLastUpdated = faker.date.recent(15);
  volunteer.softDelete = false;
  return volunteer;
};

const generateVolunteer = async () => {
  const volunteer = (await generateStaffUser()) as any;
  volunteer.startDate = faker.date.past(2);
  volunteer.profilePicture = faker.internet.avatar();
  volunteer.availabilities = generateAvailabilities();
  volunteer.availabilitiesLastUpdated = faker.date.recent(15);
  volunteer.preferredNeighbourhoods = ['Lachine', 'Montreal', 'Downtown'];
  volunteer.softDelete = false;
  return volunteer;
};

const generateAvailabilities = () => {
  const availabilities: Availabilities = { availabilities: [] };
  for (let i = 0; i < 7; i++) {
    availabilities.availabilities.push({
      day: indexedDayOfWeek[i],
      time: 1 + faker.random.numeric(1, { bannedDigits: ['1', '8', '9'] })
    });
  }
  return JSON.stringify(availabilities.availabilities);
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
    const defaultVolunteer = await generateDefaultVolunteer();
    const volunteers = await generateVolunteers(10);
    await repository.insert(defaultVolunteer);
    await repository.insert(volunteers);
    // generateTasks(dataSource, volunteers);
  }
}
