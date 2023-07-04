import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../src/entities/TaskEntity';
import { MealType, ProgramType } from '../../src/entities/types';
import { ClientEntity } from '../../src/entities/ClientEntity';

export default class MealDeliveryEntityHelper {
  MealDeliveryRepository: Repository<MealDeliveryEntity>;

  constructor(repository: Repository<MealDeliveryEntity>) {
    this.MealDeliveryRepository = repository;
  }

  createMealDelivery = async (
    isCompleted: boolean,
    routePosition: number,
    mealType: MealType,
    program: ProgramType,
    task: TaskEntity,
    client: ClientEntity
  ) => {
    const newMealDelivery = new MealDeliveryEntity();
    newMealDelivery.isCompleted = isCompleted;
    newMealDelivery.routePosition = routePosition;
    newMealDelivery.mealType = mealType;
    newMealDelivery.program = program;
    newMealDelivery.task = task;
    newMealDelivery.client = client;
    return await this.MealDeliveryRepository.save(newMealDelivery);
  };
}
