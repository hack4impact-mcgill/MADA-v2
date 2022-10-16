import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Creates an entity
// Entity is a class that maps to a database table : https://orkhan.gitbook.io/typeorm/docs/entities
@Entity()
export class ExampleEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	stringColumn: string;

	@Column()
	boolColumn: boolean;
}