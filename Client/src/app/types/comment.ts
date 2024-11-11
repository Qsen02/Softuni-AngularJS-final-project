import { Post } from "./post";
import { User } from "./user";

export interface Comment{
    _id:string,
    content:string,
    ownerId:User,
    postId:Post,
    likes:User[]
}