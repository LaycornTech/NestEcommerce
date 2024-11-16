


export interface PlatformRequest extends Request{
    authenticationId: AuthenticationId
}

export interface AuthenticationId{
    user: {
        id:number
    } 
}