import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Category{

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

}