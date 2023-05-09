import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { MealType } from './types';

@Entity()
export class ClientEntity extends UserEntity {
  @Column()
  address: string;

  @Column()
  mealType: MealType;

  @Column()
  sts: boolean;

  @Column()
  map: boolean;
}
