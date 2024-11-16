import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartDetails } from "./cartdetails.entity";



@Entity()
export class Product{
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({type: "varchar"})
    name: string;

    @Column({type: "bigint"})
    categoryId: number

    @Column({type: "bigint"})
    Available_Quantity: number;
    

    @Column({type: "bigint"})
    price: number;

    // @OneToMany(()=> CartDetails, (cartdetails)=> cartdetails.productId)
    // cartdetailsId: CartDetails[]

}