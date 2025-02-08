import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/messages';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketServiceService {
    private socket: Socket | null = null;

    constructor() {
        this.socket = io('http://localhost:3000');
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
            this.socket?.on('message deleted', (message) => {
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
            this.socket?.on('message updated', (message) => {
                observer.next(message);
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
