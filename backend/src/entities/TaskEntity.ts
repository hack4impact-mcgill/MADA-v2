import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm';
import { MealDeliveryEntity } from './MealDeliveryEntity';
import { VolunteerEntity } from './VolunteerEntity';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryTime: Date;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => VolunteerEntity, (volunteer) => volunteer.tasks)
  volunteer: VolunteerEntity;

  @OneToMany(() => MealDeliveryEntity, (delivery) => delivery.task, {
    cascade: true
  })
  deliveries: MealDeliveryEntity[];
}
