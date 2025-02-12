import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/messages';
import { Observable } from 'rxjs';
import { Request } from '../types/requests';
import { enviromentProd } from '../../../enviroment/app.prod';
import { enviroment } from '../../../enviroment/app.enviroment';
import { Chat } from '../types/chats';

@Injectable({
    providedIn: 'root',
})
export class SocketServiceService {
    private socket: Socket | null = null;

    constructor() {
        this.socket = io(enviromentProd.apiUrl);
    }

    connectSocket() {
        this.socket?.connect();
    }

    sendMessage(event: string, chatId: string | undefined, data: Message) {
        this.socket?.emit(event, chatId, data);
    }

    onMessage(event: string): Observable<{ chatId: string; message: Message }> {
        return new Observable((observer) => {
            this.socket?.on(event, (chatId, message) => {
                observer.next({ chatId: chatId, message: message });
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    deleteMessage(data: Message) {
        this.socket?.emit('delete message', data);
    }

    onDeleteMessage(event: string): Observable<Message> {
        return new Observable((observer) => {
            this.socket?.on(event, (message) => {
                observer.next(message);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }
    updateMessage(data: Message) {
        this.socket?.emit('update message', data);
    }

    onUpdateMessage(event: string): Observable<Message> {
        return new Observable((observer) => {
            this.socket?.on(event, (message) => {
                observer.next(message);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    sendRequest(request: Request) {
        this.socket?.emit('send request', request);
    }

    onSendRequest(event: string): Observable<Request> {
        return new Observable((observer) => {
            this.socket?.on(event, (request) => {
                observer.next(request);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    unreadChats(userId: string,chat:Chat) {
        this.socket?.emit('unreaded chats', userId,chat);
    }

    onUnreadChats(event: string): Observable<{ userId: string; chat: Chat }> {
        return new Observable((observer) => {
            this.socket?.on(event, (userId, chat) => {
                observer.next({ userId, chat });
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    unreadedMessages(chatId: string | undefined, userId: string,message:Message) {
        this.socket?.emit('unreaded messages', chatId, userId,message);
    }

    onUnreadMessages(
        event: string
    ): Observable<{ chatId: string | undefined; userId: string,message:Message }> {
        return new Observable((observer) => {
            this.socket?.on(event, (chatId, userId,message) => {
                observer.next({ chatId, userId, message });
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    acceptRequest(chat: Chat, userId: string) {
        this.socket?.emit('accept request', chat, userId);
    }

    onAccepRequest(event: string): Observable<{ chat: Chat; userId: string }> {
        return new Observable((observer) => {
            this.socket?.on(event, (chat, userId) => {
                observer.next({ chat, userId });
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    readChats(chat: Chat | null){
        this.socket?.emit("read chats",chat);
    }

    onReadChats(event: string): Observable<Chat> {
        return new Observable((observer) => {
            this.socket?.on(event, (chat) => {
                observer.next(chat);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    disconnectSocket() {
        this.socket?.disconnect();
    }
}
