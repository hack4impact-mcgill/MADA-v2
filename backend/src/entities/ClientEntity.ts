import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './UserEntity';

export enum MealType {
    VEGETARIAN = 'vegetarian',
    NOFISH = 'nofish',
    NOMEAT = 'nomeat',
}

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
