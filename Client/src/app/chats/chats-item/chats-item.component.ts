import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../../types/chats';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SocketServiceService } from '../../services/socket-service.service';
import { MessageItemComponent } from './message-item/message-item.component';

@Component({
    selector: 'app-chats-item',
    standalone: true,
    imports: [RouterLink, CommonModule, ReactiveFormsModule,MessageItemComponent],
    templateUrl: './chats-item.component.html',
    styleUrl: './chats-item.component.css',
})
export class ChatsItemComponent implements OnDestroy,OnInit {
    @Input('chatProp') chat: Chat | null = null;
    @Input('userIdProp') userId = '';

    addMessageFrom = new FormGroup({
        text: new FormControl('', Validators.required),
    });

    addMessageSubscription: Subscription | null = null;

    constructor(
        private chatAndMessages: ChatsAndMessagesService,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
        this.socketService.onMessage("chat message").subscribe((message)=>{
            this.chat?.messages.push(message);
        })
    }

    onAdd() {
        const text = this.addMessageFrom.value.text;
        this.addMessageSubscription = this.chatAndMessages
            .addMessageToChat(this.chat?._id, text)
            .subscribe((message) => {
                this.addMessageFrom.reset();
                this.socketService.sendMessage("chat message",message);
            });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.addMessageSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
