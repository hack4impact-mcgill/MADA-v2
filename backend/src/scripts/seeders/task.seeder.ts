import { DataSource } from 'typeorm';
import { TaskEntity } from '../../entities/TaskEntity';
import { ClientEntity } from '../../entities/ClientEntity';
import { VolunteerEntity } from '../../entities/VolunteerEntity';
import { MealDeliveryEntity } from '../../entities/MealDeliveryEntity';
import { faker } from '@faker-js/faker';
import { MealType } from '../../entities/types';

const generateMeal = (task, client) => {
  let type = MealType.VEGETARIAN;
  if (Math.random() > 0.66) {
    type = MealType.NOFISH;
  } else if (Math.random() < 0.33) {
    type = MealType.NOMEAT;
  }
  const quantity = 1 + Math.floor(Math.random() * 4);

  const meal = new MealDeliveryEntity();
  // meal.quantity = quantity;
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
