import { Chat } from "./chats"
import { Request } from "./requests"

export interface User{
    _id:string,
    username:string,
    email:string,
    password:string,
    profileImage:string,
    chats:Chat[],
    requests:Request[]
}

export interface AuthUser{
    _id:string,
    username:string,
    email:string,
    profileImage:string,
    accessToken:string
}