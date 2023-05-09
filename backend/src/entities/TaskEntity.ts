import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MealDeliveryEntity } from './MealDeliveryEntity';
import { VolunteerEntity } from './VolunteerEntity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => VolunteerEntity, (volunteer) => volunteer.tasks)
  volunteer: VolunteerEntity;

  @OneToMany(() => MealDeliveryEntity, (delivery) => delivery.task, {
    cascade: true
  })
  deliveries: MealDeliveryEntity[];
}
