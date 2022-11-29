import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskEntity } from './TaskEntity';

@Entity()
export class MealDeliveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  mealType: string;

  @ManyToOne(() => TaskEntity, (task) => task.deliveries, {
    onDelete: 'CASCADE'
  })
  task: TaskEntity;
}
