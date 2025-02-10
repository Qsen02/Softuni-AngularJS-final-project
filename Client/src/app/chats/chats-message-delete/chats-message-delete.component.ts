import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import { ActivatedRoute } from '@angular/router';
import { SocketServiceService } from '../../services/socket-service.service';
import { Chat } from '../../types/chats';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chats-message-delete',
    standalone: true,
    imports: [],
    templateUrl: './chats-message-delete.component.html',
    styleUrl: './chats-message-delete.component.css',
})
export class ChatsMessageDeleteComponent implements OnInit, OnDestroy {
    chat: Chat | null = null;

    deleteMessageSubscription: Subscription | null = null;

    constructor(
        private chatsAndMessageService: ChatsAndMessagesService,
        private route: ActivatedRoute,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
    }

    onDelete() {
        const messageId = this.route.snapshot.params['messageId'];
        const chatId = this.route.snapshot.params['chatId'];
        this.deleteMessageSubscription = this.chatsAndMessageService
            .deleteMessage(chatId, messageId)
            .subscribe((message) => {
                this.socketService.deleteMessage(message);
                history.back();
            });
    }

    onBack() {
        history.back();
    }

    ngOnDestroy(): void {
        this.deleteMessageSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
