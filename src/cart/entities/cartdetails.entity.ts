import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, OrderedBulkOperation, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class CartDetails{
    @PrimaryColumn({type: "bigint"})
    cartid: number;

    @PrimaryColumn({type: "bigint", unique: false})
    prodId: number;
    // @Column({type: "bigint", nullable: true})
    // prodId: number;

    @Column({type: "bigint"})
    amount: number;

    @Column({type:"bigint"})
    quantityOrdered: number


    @ManyToOne(()=> Order, (order)=> order.cartdetails)
    order: Order  //My interpretation == In order entity an array of cartdetails will be created
    // user: any;

    // @OneToOne(()=>User, (user)=> user.cart)
    // @JoinColumn({name: "userId"})
    // user: User;


    // @OneToMany(()=> Product, (prod)=>prod.cartdetailsId)
    // productId: Product[]
}