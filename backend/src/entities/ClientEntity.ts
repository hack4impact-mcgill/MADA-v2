import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { MealType, Neighbourhood } from './types';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column()
  phoneNumber: string;
  
  @Column()
  address: string;

  @Column()
  mealType: MealType;

  @Column()
  sts: boolean;

  @Column()
  map: boolean;
}
