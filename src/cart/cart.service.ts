import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { carts, cartdetails, orders, product, user, category } from 'src/db/db';
import { Cart } from './entities/cart.entity';
import { CartDetails } from './entities/cartdetails.entity';
import { DataSource, Db, EntityManager } from 'typeorm';
import { Order } from './entities/order.entity';
import { isDelivered, isPaid } from './constants/constants';
import { createProductDto } from './dto/createprod.dto';
import { Product } from './entities/product.entity';
import Category from './entities/category.entity';
import { throws } from 'assert';

@Injectable()
export class CartService {
  entityManager: EntityManager;
  constructor(
    datasource: DataSource
  ){
      this.entityManager = datasource.createEntityManager()
  }
  
async creatProduct(proddto: createProductDto){

  const prod = new Product()
  // prod.id = proddto.id,
  prod.id = proddto.id,
  prod.name = proddto.name,
  prod.Available_Quantity = proddto.Available_Quantity,
  prod.categoryId = proddto.categoryId,
  prod.price = proddto.price
  
  this.entityManager.save(prod)


}




  async addToCart(cartDto: CreateCartDto) {
    
    // find product with id
    const checkInProduct = product.find(prod => prod.id === cartDto.prodId);


    if (!cartDto.quantity || cartDto.quantity > checkInProduct.Available_Quantity) {
      throw new HttpException("The quantity of goods you entered is beyond limit or Null", HttpStatus.BAD_REQUEST)
    }

    const reduceProductQuantity = checkInProduct.Available_Quantity - cartDto.quantity
    checkInProduct.Available_Quantity = reduceProductQuantity;
    const amount = cartDto.quantity * checkInProduct.price;

    if(amount === undefined){
      throw new HttpException("Select your quantity of choice", HttpStatus.BAD_REQUEST)
    }
    
    let customerCart = carts.find((c) => c.userId === cartDto.userId);
    if (!customerCart) {
      customerCart = new Cart();
      customerCart.id = carts.length + 1;
      customerCart.current_Total += amount;
      customerCart.userId = cartDto.userId;
      carts.push(customerCart)
    }
    else {
      customerCart.current_Total += amount;
      customerCart.userId = cartDto.userId;
      carts.push(customerCart);
    }

    console.log(carts);
    // ord?userId=1
    // customerCarts.quantity = cartDto.quantity;



  //   const customerCartsArray = new Array()
  // customerCartsArray.push(customerCart)
    // save in a database transaction
    // save cart
    // customerCarts = await db.save(customerCarts);

    // create the cart detail
    const cartDetail = new CartDetails();
    cartDetail.prodId = cartDto.prodId;
    cartDetail.cartid = customerCart.id;
    cartDetail.quantityOrdered = cartDto.quantity;
    cartDetail.amount = amount;

    cartdetails.push(cartDetail)

    // save cart detail;
    // await db.save(cartDetail)

    return {
      ...customerCart,
      cartDetails: cartdetails.filter(cartD => cartD.cartid === customerCart.id)
    }
  }
  
  async getAllProducts():Promise<Product[]> {
    // const products = await this.entityManager.find(Product)
    // return products
     return await this.entityManager.find(Product)
  }


  async OrderOfGoods(userId: number){
    console.log(carts);
    
    const userCart =  carts.find((c) => c.userId === userId);
    // userCart.current_Total =0;
    
    if(!userCart){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
    // carts.find(id => id.userId === userCart.userId).current_Total
    // const order = JSON.parse(JSON.stringify(userCart));
    const order: Order = {
      id: orders.length + 1,
      current_total:  userCart?.current_Total,
      userId: userCart.userId,
      isDelivered: isDelivered.NOT_DELIVERED,
      paid_for: isPaid.NOt_PAID_FOR,
      cartdetails: cartdetails.find((cd) => cd.cartid === userCart.id)
    }
    // const cartdet = cartdetails.find(user=> user.cartid === userCart.userId)

    // cartdet.prodId
    orders.push(order)
    // return ` Your Order details: ${orders} with products ${cartdet.prodId}`
    return orders

    // const takeOrder = order.find(ord=> ord.id === userId.userId)
    
    // takeOrder.isDelivered = isDelivered.NOT_DELIVERED
    // takeOrder.paid_for = isPaid.NOt_PAID_FOR

    
    // if(takeOrder.isDelivered && takeOrder.paid_for){
    //   throw new HttpException("You have not placed an Order Or made payment ", HttpStatus.BAD_REQUEST)
    // }
  
    // takeOrder.isDelivered = isDelivered.DELIVERED
    // takeOrder.paid_for = isPaid.PAID_FOR 

    //   const customerCartDetails =  userCart.cartDetails.map(ccd=> ccd.quantityOrdered).reduce((acc, tot) =>  (acc+tot))
    // // const orderSummary = {
    // //   totalPrice: customerOrders.current_Total, 
    // //   totalItems:customerCartDetails, 
    // //   customer: userId.userId,
    // //   isdel: takeOrder.paid_for && takeOrder.isDelivered ? takeOrder.isDelivered :
    // //    "We are await Payment/In process of delivery",

    // // }
    // // bag.push(orderSummary)
    // // // totalprice, totalitems,userId,
    // // return bag
    // return {
    //     totalPrice: userCart.current_Total, 
    //     totalItems:customerCartDetails, 
    //     customer: userId.userId,
    //     isdel: takeOrder.isDelivered === isDelivered.DELIVERED ? "Goods Delivered" :
    //      "Delivery in Progress",
    //      isPaid:  takeOrder.paid_for === isPaid.PAID_FOR ? "Goods Paid For" : "Waiting for your payment"
    //     }

  }
  
}
