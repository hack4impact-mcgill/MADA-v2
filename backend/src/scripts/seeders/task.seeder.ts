import { DataSource } from 'typeorm';
import { TaskEntity } from '../../entities/TaskEntity';
import { ClientEntity } from '../../entities/ClientEntity';
import { VolunteerEntity } from '../../entities/VolunteerEntity';
import { MealDeliveryEntity } from '../../entities/MealDeliveryEntity';
import { faker } from '@faker-js/faker';

const generateMeal = (task, client) => {
  const type = Math.random() > 0.5 ? 'Regular' : 'Vegan';
  const quantity = 1 + Math.floor(Math.random() * 4);

  const meal = new MealDeliveryEntity();
  meal.quantity = quantity;
  meal.mealType = type;
  meal.task = task;
  meal.client = client;
  return meal;
};

export const generateTask = async (
  dataSource: DataSource,
  volunteer: VolunteerEntity
) => {
  const task = new TaskEntity();
  task.isCompleted = false;
  task.deliveryTime = faker.date.between(
    '2021-01-01T00:00:00.000Z',
    '2023-01-01T00:00:00.000Z'
  );
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
    const meal = generateMeal(task, client);
    await mealRepository.insert(meal);
  }

  return task;
};
