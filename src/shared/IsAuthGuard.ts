import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthenticationId, PlatformRequest } from "src/lib/types";


export class IsAuthGuard implements CanActivate{
    constructor(){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.checkUserAccess(context)
    }

    private checkUserAccess(context: ExecutionContext){
        const userData = this.getUserAccess(context) as AuthenticationId;
        const isAuhenticated = !!userData && !!userData.user.id;

        return isAuhenticated;
    }
    
    private getUserAccess(context: ExecutionContext){
        const req = context.switchToHttp().getRequest() as PlatformRequest;
        const authpayload = req.authenticationId;
        return authpayload;
    }
}