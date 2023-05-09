import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {RouteDeliveryEntity} from './RouteDeliveryEntity';

@Entity()
export abstract class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Personal info
  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column()
  phoneNumber: string;
}
