import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResetTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  userId: number;
}
