import { User } from "./user";

export interface Request {
    _id:string,
    sender_id:User,
    created_at:string,
    updated_at:string
}