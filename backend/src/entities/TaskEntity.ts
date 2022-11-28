import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MealDeliveryEntity } from './MealDeliveryEntity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryTime: Date;

  @Column()
  isCompleted: boolean;

  @OneToMany(() => MealDeliveryEntity, (delivery) => delivery.task, {
    cascade: true
  })
  deliveries: MealDeliveryEntity[];
}
