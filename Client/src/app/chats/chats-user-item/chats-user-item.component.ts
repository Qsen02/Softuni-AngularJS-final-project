import { Component, EventEmitter, Input, Output } from '@angular/core';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { Chat } from '../../types/chats';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';

@Component({
    selector: 'app-chats-user-item',
    standalone: true,
    imports: [],
    templateUrl: './chats-user-item.component.html',
    styleUrl: './chats-user-item.component.css',
})
export class ChatsUserItemComponent {
    @Input('userIdProp') userId: string = '';
    @Input('chatsProp') chats: Chat[] = [];
    @Input() openChat: Chat | null = null;
    @Output() openChatChange = new EventEmitter<Chat>();
    @Input() isChatOpen = false;
    @Output() isChatOpenChange = new EventEmitter<boolean>();
    @Input() isInit = true;
    @Output() isInitChange = new EventEmitter<boolean>();
    @Input() isSearched = false;
    @Output() isSearchedChange = new EventEmitter<boolean>();
    @Input() isRequestsOpen = false;
    @Output() isRequestsOpenChange = new EventEmitter<boolean>();

    constructor(private chatsAndMessages: ChatsAndMessagesService) {}

    onOpen(chatId: string) {
        this.chatsAndMessages.getChatById(chatId).subscribe((chat) => {
            this.openChat = chat;
            this.openChatChange.emit(this.openChat);
            this.isChatOpen = true;
            this.isChatOpenChange.emit(this.isChatOpen);
            this.isInit = false;
            this.isInitChange.emit(this.isInit);
            this.isSearched = false;
            this.isSearchedChange.emit(this.isSearched);
            this.isRequestsOpen = false;
            this.isRequestsOpenChange.emit(this.isRequestsOpen);
        });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
