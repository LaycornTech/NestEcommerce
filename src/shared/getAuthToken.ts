import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PlatformRequest } from "src/lib/types";



export const GetAuthToken = createParamDecorator((data: unknown, ctx: ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest() as PlatformRequest

    if (data){
        const authpayload = data as string;
        return req.authenticationId ? req.authenticationId[authpayload] : req.authenticationId
    }
    return req.authenticationId
})