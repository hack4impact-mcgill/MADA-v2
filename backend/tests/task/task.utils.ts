import { TaskEntity } from '../../src/entities/TaskEntity';
import { Repository } from 'typeorm';
import { MealDeliveryEntity } from '../../src/entities/MealDeliveryEntity';

export default class TaskEntityHelper {
  TaskRepository: Repository<TaskEntity>;

  constructor(repository: Repository<TaskEntity>) {
    this.TaskRepository = repository;
  }

  createTask = async (
    deliveries: MealDeliveryEntity[],
    isCompleted: boolean
  ) => {
    const newTask = new TaskEntity();
    newTask.deliveries = deliveries;
    newTask.isCompleted = isCompleted;
    return await this.TaskRepository.save(newTask);
  };
}
