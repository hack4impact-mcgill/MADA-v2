import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../src/entities/TaskEntity';

export default class MealDeliveryEntityHelper {
  MealDeliveryRepository: Repository<MealDeliveryEntity>;

  constructor(repository: Repository<MealDeliveryEntity>) {
    this.MealDeliveryRepository = repository;
  }

  createMealDelivery = async (
    quantity: number,
    mealType: string,
    task: TaskEntity
  ) => {
    const newMealDelivery = new MealDeliveryEntity();
    newMealDelivery.quantity = quantity;
    newMealDelivery.mealType = mealType;
    newMealDelivery.task = task;
    return await this.MealDeliveryRepository.save(newMealDelivery);
  };
}
