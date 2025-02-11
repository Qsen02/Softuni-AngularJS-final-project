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
import { Message } from '../../types/messages';
import { UserService } from '../../services/user.service';

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
    @Input() isLoading = false;
    @Output() isLoadingChange = new EventEmitter<boolean>();
    @Input() isError = false;
    @Output() isErrorChange = new EventEmitter<boolean>();
    unreadedMessages: Message[] = [];

    isUnreadMessages = false;
    unreadedChatId: string | undefined = '';
    getChatSubscription: Subscription | null = null;

    constructor(
        private chatsAndMessages: ChatsAndMessagesService,
        private socketService: SocketServiceService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getUserById(this.userId).subscribe((user) => {
            this.unreadedMessages = user.unreadedMessages;
            if(this.unreadedMessages.length > 0){
                this.isUnreadMessages=true;
            }
        });
        this.socketService.connectSocket();
        this.socketService
            .onUnreadMessages('show messages')
            .subscribe(({ chatId, userId,message }) => {
                if (this.userId == userId) {
                    this.unreadedChatId = chatId;
                    this.isUnreadMessages = true;
                    this.chatsAndMessages.getChatById(this.unreadedChatId).subscribe((chat)=>{
                        if(chat.messages.map(el=>el._id).includes(message._id)){
                            this.unreadedMessages.push(message);
                        }
                    })
                }
            });
    }

    onOpen(chatId: string) {
        this.isLoading = true;
        this.isLoadingChange.emit(this.isLoading);
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
                    this.isLoadingChange.emit(this.isLoading);
                },
                error: () => {
                    this.isLoading = false;
                    this.isLoadingChange.emit(this.isLoading);
                    this.isError = true;
                    this.isErrorChange.emit(this.isError);
                },
            });
            if(this.isUnreadMessages){
                this.chatsAndMessages.removeUnreadedChatsAndMessages(chatId).subscribe();
            }
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
