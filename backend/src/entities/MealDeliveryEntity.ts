import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { TaskEntity } from './TaskEntity';
import { ProgramType, MealType } from './types';

@Entity()
export class MealDeliveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  routePosition: number;

  @Column()
  mealType: MealType;

  @Column()
  program: ProgramType;

  @ManyToOne(() => TaskEntity, (task) => task.deliveries, {
    onDelete: 'CASCADE'
  })
  task: TaskEntity;

  @ManyToOne(() => ClientEntity)
  client: ClientEntity;
}
