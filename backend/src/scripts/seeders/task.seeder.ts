import { DataSource } from 'typeorm';
import { TaskEntity } from '../../entities/TaskEntity';
import { ClientEntity } from '../../entities/ClientEntity';
import { VolunteerEntity } from '../../entities/VolunteerEntity';
import { MealDeliveryEntity } from '../../entities/MealDeliveryEntity';
import { faker } from '@faker-js/faker';
import { MealType, ProgramType } from '../../entities/types';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

const generateMeal = (task, client, position) => {
  let type = MealType.VEGETARIAN;
  if (Math.random() > 0.66) {
    type = MealType.NOFISH;
  } else if (Math.random() < 0.33) {
    type = MealType.NOMEAT;
  }

  const meal = new MealDeliveryEntity();
  meal.mealType = type;
  meal.task = task;
  meal.client = client;
  meal.routePosition = position;
  meal.isCompleted = false;
  meal.program = faker.helpers.arrayElement([ProgramType.STS, ProgramType.MAP]);
  return meal;
};

export const generateTask = async (
  dataSource: DataSource,
  volunteer: VolunteerEntity
) => {
  const task = new TaskEntity();
  task.isCompleted = false;
  task.date = faker.date.future(0.1);
  const repository = dataSource.getRepository(TaskEntity);
  await repository.insert(task);
  await dataSource
    .createQueryBuilder()
    .relation(VolunteerEntity, 'tasks')
    .of({ email: volunteer.email })
    .add({ id: task.id });
  await dataSource
    .createQueryBuilder()
    .relation(TaskEntity, 'volunteer')
    .of({ id: task.id })
    .set({ id: volunteer.id, email: volunteer.email });

  const clientRepository = dataSource.getRepository(ClientEntity);
  const mealRepository = dataSource.getRepository(MealDeliveryEntity);

  const clients = await clientRepository.find();

  const num = 1 + Math.floor(Math.random() * 3);
  for (let i = 0; i <= num; i++) {
    const n = Math.floor(Math.random() * clients.length);
    const client = clients[n];
    const meal = generateMeal(task, client, i);
    await mealRepository.insert(meal);
  }

  return task;
};

export default class ClientSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const volunteerRepo = dataSource.getRepository(VolunteerEntity);
    const repository = dataSource.getRepository(TaskEntity);
    const volunteers = await volunteerRepo.find();
    volunteers?.forEach(async (volunteer) => {
      const task = await generateTask(dataSource, volunteer);
      const task2 = await generateTask(dataSource, volunteer);
      const task3 = await generateTask(dataSource, volunteer);
      await repository.insert(task);
      await repository.insert(task2);
      await repository.insert(task3);
    });
  }
}
