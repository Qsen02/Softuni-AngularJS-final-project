import { Component } from '@angular/core';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chats-message-delete',
    standalone: true,
    imports: [],
    templateUrl: './chats-message-delete.component.html',
    styleUrl: './chats-message-delete.component.css',
})
export class ChatsMessageDeleteComponent {

    constructor(
        private chatsAndMessageService: ChatsAndMessagesService,
        private route: ActivatedRoute
    ) {}

    onDelete() {
        const messageId=this.route.snapshot.params['messageId'];
        const chatId=this.route.snapshot.params['chatId'];
        this.chatsAndMessageService.deleteMessage(chatId,messageId).subscribe(()=>{
            history.back();
        })
    }

    onBack() {
       history.back();
    }
}
