import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { Chat } from '../../types/chats';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import { SocketServiceService } from '../../services/socket-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chats-user-item',
    standalone: true,
    imports: [],
    templateUrl: './chats-user-item.component.html',
    styleUrl: './chats-user-item.component.css',
})
export class ChatsUserItemComponent implements OnInit, OnDestroy {
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
    @Input("isLoadingProp") isLoading = false;
    @Input("isErrorProp") isError = false;

    isUnreadMessages = false;
    unreadedChatId: string | undefined = '';
    getChatSubscription: Subscription | null = null;

    constructor(
        private chatsAndMessages: ChatsAndMessagesService,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
        this.socketService
            .onUnreadMessages('show messages')
            .subscribe(({ chatId, userId }) => {
                if (this.userId == userId) {
                    this.unreadedChatId = chatId;
                    this.isUnreadMessages = true;
                }
            });
    }

    onOpen(chatId: string) {
        this.isLoading = true;
        this.getChatSubscription = this.chatsAndMessages
            .getChatById(chatId)
            .subscribe({
                next: (chat) => {
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
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                    this.isError = true;
                },
            });
    }

    readMessages() {
        this.isUnreadMessages = false;
        this.unreadedChatId = '';
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.getChatSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
