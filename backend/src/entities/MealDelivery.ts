import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MealDeliveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  mealType: string;
}
