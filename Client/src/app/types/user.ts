import { Chat } from "./chats"
import { Message } from "./messages"
import { Request } from "./requests"

export interface User{
    _id:string,
    username:string,
    email:string,
    password:string,
    profileImage:string,
    chats:Chat[],
    requests:Request[],
    unreadedChats:Chat[],
    unreadedMessages:Message[]
}

export interface AuthUser{
    _id:string,
    username:string,
    email:string,
    profileImage:string,
}