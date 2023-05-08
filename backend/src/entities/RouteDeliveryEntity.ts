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
export class RouteDeliveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  routeNumber: number;

  @Column()
  routePosition: number;

  @Column()
  mealType: MealType;

  @Column()
  program: ProgramType

  @ManyToOne(() => ClientEntity)
  client: ClientEntity;
}
