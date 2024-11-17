import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { SharedService } from "./shared.service";
import { AuthenticationId, PlatformRequest } from "src/lib/types";


@Injectable()
export class ExtractTokenMiddleware implements NestMiddleware{
    constructor(private sharedservice: SharedService){}

    async use(req: PlatformRequest, _:Response, next: (error?: any) => void) {
        try{
            const authTokenString = req.headers['authorization'] || "";
            if(authTokenString.length > 0){
                const extractedToken = authTokenString.split(' ')[1];
                if(extractedToken !== undefined){
                    const authpayload = await this.sharedservice.verifyJwt(extractedToken) as unknown as AuthenticationId;
                    if(authpayload){
                        if ('user' in authpayload && 'id' in authpayload.user){
                            req.authenticationId = authpayload
                        }else{
                            throw new Error("AuthToken Malfunction")
                        }
                    }
                }
            }
            next();
        }catch(error){
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
    }
}