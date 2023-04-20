import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
    // Account info
    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

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

    @Column({nullable: true})
    token: string;
}
