import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { createProductDto } from './dto/createprod.dto';
import { IsAuthGuard } from 'src/shared/IsAuthGuard';
import { GetAuthToken } from 'src/shared/getAuthToken';
import { AuthenticationId } from 'src/lib/types';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Post("prod")
  creatProduct(@Body() createprod: createProductDto){
    return this.cartService.creatProduct(createprod)
  }

  // Add to cart, reduce the qty in stock wrt qty demanded for
  @Post("")
  addToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto);
  }
  //  Get all the Products Available in Stock
  @Get()
  @UseGuards(IsAuthGuard)
  getAllProducts(
    // @GetAuthToken() payload: AuthenticationId 
  ) {
    return this.cartService.getAllProducts();
  }

  @Get("ord")
  OrderOfGoods(@Query('userId') userId: string){
    return this.cartService.OrderOfGoods(Number(userId))
  }
}
