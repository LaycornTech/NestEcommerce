import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserSignUpDto } from './dto/UserSignUp.dto';
import { UserService } from './user.service';
import { UserSignInDto } from './dto/UserSignIn.dto';
// import { IsAuthGuard } from 'src/shared/IsAuthGuard';
import { GetAuthToken } from 'src/shared/getAuthToken';
import { AuthenticationId } from 'src/lib/types';

@Controller("user")
export class UserController {
    constructor(private userService: UserService){}

@Post("signup")
signup(@Body() signup: UserSignUpDto){
    return this.userService.signup(signup)
}

@Post("signin")
signin(@Body() signin: UserSignInDto){
    return this.userService.signin(signin)
    }

}
