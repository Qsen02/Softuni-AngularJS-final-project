import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../types/chats';
import { Message } from '../types/messages';

@Injectable({
    providedIn: 'root',
})
export class ChatsAndMessagesService {
    endpoint = 'chats';

    constructor(private http: HttpClient) {}

    getChatById(chatId: string | undefined) {
        return this.http.get<Chat>(`/api/${this.endpoint}/${chatId}`);
    }

    getMessageById(messageId: string|undefined){
        return this.http.get<Message>(`/api/${this.endpoint}/message/${messageId}`);
    }

    createChat(userId: string | undefined) {
        return this.http.post<Chat>(`/api/${this.endpoint}`, { _id: userId });
    }

    addMessageToChat(
        chatId: string | undefined,
        text: string | null | undefined
    ) {
        return this.http.put<Message>(
            `/api/${this.endpoint}/${chatId}/addMessage`,
            { text: text }
        );
    }

    editMessage(messageId: string, text: string | null | undefined) {
        return this.http.put<Message>(
            `/api/${this.endpoint}/message/${messageId}`,
            { text: text }
        );
    }

    deleteMessage(chatId: string, messageId: string) {
        return this.http.delete<Object>(
            `/api/${this.endpoint}/${chatId}/message/${messageId}`
        );
    }
}
