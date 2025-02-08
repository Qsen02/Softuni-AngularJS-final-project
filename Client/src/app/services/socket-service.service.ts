import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/messages';
import { Observable } from 'rxjs';
import { Request } from '../types/requests';
import { enviromentProd } from '../../../enviroment/app.prod';

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

    sendRequest(request:Request){
        this.socket?.emit("send request",request);
    }

    onSendRequest(event:string):Observable<Request>{
        return new Observable((observer) => {
            this.socket?.on(event, (request) => {
                observer.next(request);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    unreadChats(userId:string){
        this.socket?.emit("unreaded chats",userId);
    }

    onUnreadChats(event:string):Observable<string>{
        return new Observable((observer) => {
            this.socket?.on(event, (userId) => {
                observer.next(userId);
            });

            return () => {
                this.socket?.off(event);
            };
        });
    }

    unreadedMessages(chatId:string | undefined,userId:string){
        this.socket?.emit("unreaded messages",chatId,userId);
    }

    onUnreadMessages(event:string):Observable<{chatId:string | undefined,userId:string}>{
        return new Observable((observer) => {
            this.socket?.on(event, (chatId,userId) => {
                observer.next({chatId,userId});
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
