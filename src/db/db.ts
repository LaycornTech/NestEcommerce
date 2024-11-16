import { Availability, isDelivered, isPaid } from "src/cart/constants/constants";
import { CartDetails } from "src/cart/entities/cartdetails.entity";
import Category from "src/cart/entities/category.entity";
import { Product } from "src/cart/entities/product.entity";
import { User } from "src/cart/entities/user.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/cart/entities/order.entity";

// add products of the same category but made in different countries
export const product=[{
    id: 1,
    name: "Bournvita",
    price: 2000,
    Available_Quantity: 50,
    categoryId: 1
},{
    id: 2,
    name: "VersaChoes",
    price: 50000,
    Available_Quantity: 20,
    categoryId: 7
},
    {
    id: 3,
    name: "Nike XXL",
    price: 10000,
    Available_Quantity: 50,
    categoryId: 3
},
    {
    id: 4,
    name: "Samolana",
    price: 8000,
    Available_Quantity: 70,
    categoryId: 2
},
    {
    id: 5,
    name: "BreakaJuice",
    price: 12000,
    Available_Quantity: 60,
    categoryId: 4
},
    {
    id: 6,
    name: "Brazillian",
    price: 200000,
    Available_Quantity: 80,
    categoryId: 6
},
    {
    id: 7,
    name: "LiteSkin",
    price: 15000,
    Available_Quantity: 150,
    categoryId: 5
},
]

export let category: Category[]=[{
    id: 1,
    name:"Beverages",
    description: "chocolate drinks"
},{
    id: 2,
    name:"Food",
    description: "Halal Food"
},{
    id: 3,
    name:"clothes",
    description: "Versace Brands"
},{
    id: 4,
    name: "Juice",
    description: "Non-Alcoholic Drinks"
},{
    id: 5,
    name: "Body Lotion",
    description:"Non-Bleaching creams"
},
{
    id:6,
    name: "Hair",
    description: "Straight blonde hair"
},
{
    id: 7,
    name: "Shoes",
    description: "Brand new Shoes"
}
]


export let carts: Cart[] = [{
    userId: 1,
    id: 1,
    current_Total: 0,
    user: new User
}];

export let cartdetails: CartDetails[] = [];

export let orders: Order[] = []
// type baggy = {
//     totalPrice: number, 
//       totalItems:number
//       customer: number
//       isdel: isDelivered | string
// }
// export let bag: baggy[]

export let user: User[]