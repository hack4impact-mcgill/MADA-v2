import { TaskEntity } from '../src/entities/TaskEntity';
import { AppDataSource } from '../src/data-source';

describe('Tasks tests', () => {
  it('should update test', async () => {
    // save a new task
    const TaskRepository = AppDataSource.getRepository(TaskEntity);
    const newTask = new TaskEntity();
    newTask.deliveryTime = new Date('December 17, 1995 03:24:00');
    newTask.deliveries = [];
    newTask.isCompleted = false;
    const savedTask = await TaskRepository.save(newTask);

    // to finish
  });
});
