import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { User } from './entities/user.entity';

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


async addToCart(cartDto: CreateCartDto, payloadId: number) {
  if (!payloadId){
        throw new UnauthorizedException("Please Signup")
      }

    const checkInProduct = await this.entityManager.findOne(Product, {where:{id: cartDto.prodId}})

    if(!cartDto.quantity || cartDto.quantity > checkInProduct.Available_Quantity){
      throw new HttpException("The quantity of goods you entered is beyond limit or Null", HttpStatus.BAD_REQUEST)
    }

    const reduceProductQuantity = checkInProduct.Available_Quantity - cartDto.quantity
    checkInProduct.Available_Quantity = reduceProductQuantity;
    const amount = cartDto.quantity * checkInProduct.price;

    if(amount === undefined){
      throw new HttpException("Select your quantity of choice", HttpStatus.BAD_REQUEST)
    }

  const myCart = new Cart()
    
  myCart.id = carts.length + 1,
  myCart.userId = payloadId,
  myCart.current_Total = amount


    await this.entityManager.save(myCart)
    const createdCart = await this.entityManager.find(Cart, {where: {userId: payloadId}})
    // return createdCart
    let totalAmount = 0
    for (let cart of createdCart){
      totalAmount = Number(cart.current_Total);
    }
    const myDetails = new CartDetails()
    myDetails.amount = totalAmount,
    myDetails.cartid = payloadId,
    myDetails.prodId = cartDto.prodId,
    myDetails.quantityOrdered = cartDto.quantity
    
    await this.entityManager.save(myDetails)
    // return CartDetails
    // return totalAmount
    // =====================Sol 1 for cart details=================================
    // const sumTotal = createdCart.map(cart=> cart.current_Total).reduce((cart, tot)=> (cart+tot), 0)
    // const myDetails= new CartDetails() 
    // myDetails.amount += sumTotal,
    // myDetails.cartid = payloadId,
    // myDetails.prodId = cartDto.prodId
    // myDetails.quantityOrdered = cartDto.quantity

    // this.entityManager.save(myDetails)
    // =====================Sol 1 for cart details=================================


}

async cartDetails(payload: number){
  const customerCart = await this.entityManager.find(CartDetails, {where:{cartid: payload}}) 

  const sumTotal = customerCart.map(cc => Number(cc.amount)).reduce((acc, tot)=>(acc+tot),0)
  // return customerCart
  return [ sumTotal, ...customerCart,]
}


  
  async getAllProducts():Promise<Product[]> {
    // const products = await this.entityManager.find(Product)
    // return products
     return await this.entityManager.find(Product)
  }


  async OrderOfGoods(payloadId: number){
    console.log(carts);
    
    // const userCart =  carts.find((c) => c.userId === userId);
    const userCart =  await this.entityManager.find(CartDetails, {where:{cartid: payloadId}});
   
    
    if(!userCart){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
    

const newOrder = new Order()
newOrder.id = orders.length + 1,
newOrder.isDelivered = isDelivered.NOT_DELIVERED,
newOrder.paid_for = isPaid.NOt_PAID_FOR,
newOrder.userId = payloadId,
newOrder.current_total = await this.cartDetails(payloadId)[0]
newOrder.cartdetails = userCart

await this.entityManager.save(newOrder)
return newOrder

// Why didint this work with cartdetails declared below????????????????????????????????
    // const order: Order = {
    //   id: orders.length + 1,
    //   // current_total:  userCart?.current_Total,
    //   userId: payloadId,
    //   current_total: this.cartDetails(payloadId)[0],
    //   isDelivered: isDelivered.NOT_DELIVERED,
    //   paid_for: isPaid.NOt_PAID_FOR,
    //   // cartdetails: cartdetails.find((cd) => cd.cartid === payloadId)

    //   cartdetails: this.entityManager.find(CartDetails, {where: {cartid: payloadId}})

    //   // cartdetails: await this.entityManager.find(CartDetails, {where: {
    //   //   cartid:userCart.id
    //   // }})
    // }


    // await this.entityManager.save(order)
    // const cartdet = cartdetails.find(user=> user.cartid === userCart.userId)

    // orders.push(order)
  
        
    
  }
  
}


// ============================code before DB connection====================================

  // async addToCart(cartDto: CreateCartDto, payloadId: number) {

  //   if (!payloadId){
  //     throw new UnauthorizedException("Please Signup")
  //   }

    
  //   // find product with id
  //   // const checkInProduct = product.find(prod => prod.id === cartDto.prodId);
  //   const checkInProduct = await this.entityManager.findOne(Product, {where:{id: cartDto.prodId}})


  //   // if (!cartDto.quantity || cartDto.quantity > checkInProduct.Available_Quantity) {
  //   //   throw new HttpException("The quantity of goods you entered is beyond limit or Null", HttpStatus.BAD_REQUEST)
  //   // }
  //   if(!cartDto.quantity || cartDto.quantity > checkInProduct.Available_Quantity){
  //     throw new HttpException("The quantity of goods you entered is beyond limit or Null", HttpStatus.BAD_REQUEST)
  //   }

  //   const reduceProductQuantity = checkInProduct.Available_Quantity - cartDto.quantity
  //   checkInProduct.Available_Quantity = reduceProductQuantity;
  //   const amount = cartDto.quantity * checkInProduct.price;

  //   if(amount === undefined){
  //     throw new HttpException("Select your quantity of choice", HttpStatus.BAD_REQUEST)
  //   }

  //   // let customerCart = carts.find((c) => c.userId === cartDto.userId);
  //   // let customerCart = await this.entityManager.findOne(Cart, {where: {userId:cartDto.userId}})
    
  //   let customerCart = await this.entityManager.findOne(Cart, {where: {userId:payloadId}})
    
  //   if (!customerCart) {
  //     customerCart = new Cart();
  //     customerCart.id = carts.length + 1;
  //     customerCart.current_Total += amount;
  //     // customerCart.userId = cartDto.userId;
  //     // customerCart.userId = payloadId;
  //     // carts.push(customerCart)
  //     this.entityManager.save(customerCart)
  //   }
  //   else {
  //     customerCart.current_Total += amount;
  //     // customerCart.userId = cartDto.userId;
  //     // customerCart.userId = payloadId;
  //     // carts.push(customerCart);
  //     this.entityManager.save(customerCart)

  //   }

  //   console.log(carts);
  //   // ord?userId=1

  //   // create the cart detail
  //   const cartDetail = new CartDetails();
  //   cartDetail.prodId = cartDto.prodId;
  //   cartDetail.cartid = customerCart.id;
  //   cartDetail.quantityOrdered = cartDto.quantity;
  //   cartDetail.amount = amount;

  //   // cartdetails.push(cartDetail)
  //   this.entityManager.save(cartDetail)
    

  //   // save cart detail;
  //   // await db.save(cartDetail)

  //   // return {
  //   //   ...customerCart,
  //   //   cartDetails: cartdetails.filter(cartD => cartD.cartid === customerCart.id)
  //   // }
  //   return{
  //     // cartdetails: this.entityManager.find(CartDetails, {where:{cartid:cartDto.userId}})
  //     cartdetails: this.entityManager.find(CartDetails, {where:{cartid:payloadId}})
  //   }
  // }






  // ========================================rough work=========================
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
// =================================================================================================