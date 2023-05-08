import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserEntity } from './UserEntity';
// Creates an entity
// Entity is a class that maps to a database table : https://orkhan.gitbook.io/typeorm/docs/entities
@Entity()
export class AdminEntity extends UserEntity {
  @Column()
  jobTitleColumn: string;

  // Account info
  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;
}
