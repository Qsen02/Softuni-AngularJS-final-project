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

    sendMessage(event: string, data: Message) {
        this.socket?.emit(event, data);
    }

    onMessage(event: string): Observable<Message> {
        return new Observable((observer) => {
            this.socket?.on(event, (data) => {
                observer.next(data);
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
