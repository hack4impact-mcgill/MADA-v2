import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TaskEntity } from '../entities/TaskEntity';
import { VolunteerEntity } from '../entities/VolunteerEntity';
import { faker } from '@faker-js/faker';

export const generateTask = async (dataSource: DataSource, volunteer: VolunteerEntity) => {
    const task = new TaskEntity();
    task.isCompleted = false;
    task.deliveryTime = new Date();
    const repository =  dataSource.getRepository(TaskEntity);
    await repository.insert(task);
    await dataSource.createQueryBuilder().relation(VolunteerEntity, "tasks").of({ username: volunteer.username}).add({id: task.id})
    await dataSource.createQueryBuilder().relation(TaskEntity, "volunteer").of({id: task.id}).set({ id: volunteer.id, username: volunteer.username})
    return task;
}
