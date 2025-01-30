import { User } from './user';

export interface Message {
    _id: string;
    owner_id: User;
    text: string;
    created_at: string;
    updated_at: string;
}
