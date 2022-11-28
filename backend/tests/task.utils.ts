import { TaskEntity } from '../src/entities/TaskEntity';
import { Repository } from 'typeorm';

export default class TaskEntityHelper {
    TaskRepository: Repository<TaskEntity>;

    constructor(repository: Repository<TaskEntity>) {
    	this.TaskRepository = repository
    }
    
    createTask = async (deliveryTime: string, deliveries: [], isCompleted: boolean) => {
        const newTask = new TaskEntity()
        newTask.deliveryTime = new Date(deliveryTime);
        newTask.deliveries = deliveries;
        newTask.isCompleted = isCompleted;
        return await this.TaskRepository.save(newTask);
    }

}
