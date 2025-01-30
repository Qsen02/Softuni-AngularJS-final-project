import { Message } from './messages';
import { User } from './user';

export interface Chat {
    _id: string;
    requester_id: User;
    receiver_id: User;
    messages: Message[];
    created_at: string;
    updated_at: string;
}
