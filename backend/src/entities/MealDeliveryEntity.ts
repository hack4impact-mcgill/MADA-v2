import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { TaskEntity } from './TaskEntity';

@Entity()
export class MealDeliveryEntity extends BaseEntity {
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

  @OneToOne(() => ClientEntity)
  @JoinColumn()
  client: ClientEntity;
}
