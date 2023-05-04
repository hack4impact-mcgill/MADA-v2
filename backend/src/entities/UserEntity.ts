import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
