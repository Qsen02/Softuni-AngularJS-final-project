import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import { ActivatedRoute } from '@angular/router';
import { SocketServiceService } from '../../services/socket-service.service';
import { Chat } from '../../types/chats';

@Component({
    selector: 'app-chats-message-delete',
    standalone: true,
    imports: [],
    templateUrl: './chats-message-delete.component.html',
    styleUrl: './chats-message-delete.component.css',
})
export class ChatsMessageDeleteComponent implements OnInit, OnDestroy {
    chat: Chat | null = null;

    constructor(
        private chatsAndMessageService: ChatsAndMessagesService,
        private route: ActivatedRoute,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
        const chatId = this.route.snapshot.params['chatId'];
        this.chatsAndMessageService.getChatById(chatId).subscribe((chat) => {
            this.chat=chat;
        });
        this.socketService
            .onDeleteMessage('message deleted')
            .subscribe((message) => {
                this.chat!.messages=this.chat!.messages.filter(el=>el._id != message._id);
            });
    }

    onDelete() {
        const messageId = this.route.snapshot.params['messageId'];
        const chatId = this.route.snapshot.params['chatId'];
        this.chatsAndMessageService
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
        this.socketService.disconnectSocket();
    }
}
