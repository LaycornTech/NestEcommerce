import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {UserSignUpDto}  from './dto/UserSignUp.dto';
import { UserSignInDto } from './dto/UserSignIn.dto';
import { User } from 'src/cart/entities/user.entity';
// import  {hash}  from 'bcryptjs';
import { user } from 'src/db/db';
import { SharedService } from 'src/shared/shared.service';
import { AuthenticationId } from 'src/lib/types';
import { DataSource, EntityManager } from 'typeorm';
// import { compare, hash } from 'bcrypt'; //compare and hash require bcrypt not bcryptjs
import * as jwt from "jsonwebtoken" // jwt comes without bracket
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    entityManager: EntityManager
    constructor( private readonly datasource: DataSource){
        this.entityManager = datasource.createEntityManager()
    }


async signup(signup: UserSignUpDto){
    const newIntake = new User()

    newIntake.firstname = signup.firstname
    newIntake.email = signup.email
    // newIntake.password= signup.password
    newIntake.confirm = signup.confirm

    const saltRound = 10;
    const hashedPass = await bcrypt.hash(signup.password,saltRound)
    newIntake.password = hashedPass
    if(signup.password !== signup.confirm){
        throw new HttpException("Password don't Match", HttpStatus.BAD_REQUEST)
    }
    

    // newIntake.password = undefined
    // newIntake.confirm = undefined
    // user.push(newIntake)
    // return 'User was created successfully';

     await this.entityManager.save(newIntake)
}

    async signin(signinDetails: UserSignInDto,
    //  payload: AuthenticationId
    ){

    // const confirmUser = user.find(user => user.email === signinDetails.email)

    // const receiveToken = this.authUser.signPayload(
        // payload
    // )

//     if(!confirmUser){
//         throw new HttpException("You are not signed Up", HttpStatus.NOT_ACCEPTABLE)
//     }

//     if(confirmUser.password)

//     return "You are now signedIn Mr " + confirmUser.firstname
// }
const assertUser =await this.entityManager.findOne(User, {where: {firstname: signinDetails.firstname}})
if(!assertUser){
    throw new ForbiddenException("Signup Please!!")
}
const validateUser = await bcrypt.compare(signinDetails.password, assertUser.password)
if(!validateUser){
    throw new UnauthorizedException("Password incorrect")
    }
    const userLoad = {
        user:{
            id:assertUser.id
        }
    }
    const reqJwtToken = jwt.sign(userLoad, "thisisthesecret", {expiresIn: "10h"})

        return {reqJwtToken}
    }
}
