import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { ProgramType, MealType } from './types';

@Entity()
export class RouteDeliveryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  routeNumber: number;

  @Column()
  routePosition: number;

  @Column()
  mealType: MealType;

  @Column()
  program: ProgramType;

  @ManyToOne(() => ClientEntity)
  client: ClientEntity;
}
