import { Comment } from "./comment";
import { User } from "./user";

export interface Post{
    _id:string,
    description:string,
    imageUrl:string,
    ownerId:User,
    comments:Comment[],
    likes:User[],
    created_at:string,
    updatedAt:string
}