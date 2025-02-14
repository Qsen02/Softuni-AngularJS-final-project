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
    @Input() unreadedMessages: Message[] = [];
    @Output() unreadedMessagesChange = new EventEmitter<Message[]>();
    @Input() isUnreadedMessages = false;
    @Output() isUnreadedMessagesChange = new EventEmitter<boolean>();
    unreadedChatIds: (string | undefined)[] = [];
    getChatSubscription: Subscription | null = null;
    getUserSubscription: Subscription | null = null;

    constructor(
        private chatsAndMessages: ChatsAndMessagesService,
        private socketService: SocketServiceService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        const unreadedMessageIds=this.unreadedMessages.map(el=>el._id);
        this.unreadedChatIds=this.chats.filter((el)=>{
            const messages:Message[]=[];
            el.messages.forEach((el)=>{
                if(unreadedMessageIds.includes(el._id)){
                    messages.push(el);
                }
            }) 
            if(messages.length > 0){
                return el;
            }
            return;
        }).map(el=>el._id);
        this.socketService.connectSocket();
        this.socketService
            .onUnreadMessages('show messages')
            .subscribe(({ chatId, userId,message }) => {
                if (this.userId == userId) {
                    this.unreadedChatIds.push(chatId);
                    this.unreadedMessages.push(message);
                    this.unreadedMessagesChange.emit(this.unreadedMessages);
                    this.isUnreadedMessages = true;
                    this.isUnreadedMessagesChange.emit(this.isUnreadedMessages);
                }
            });
        this.socketService.onReadMessages("messages readed").subscribe((chatId)=>{
            this.unreadedChatIds=this.unreadedChatIds.filter((el)=>el!=chatId);
        })
    }

    onOpen(chatId: string) {
        this.isLoading = true;
        this.isLoadingChange.emit(this.isLoading);
        this.getUserSubscription = this.userService
            .getUserById(this.userId)
            .subscribe((user) => {
                this.unreadedMessages = user.unreadedMessages;
                if (this.unreadedMessages.length > 0) {
                    this.isUnreadedMessages = true;
                    this.isUnreadedMessagesChange.emit(this.isUnreadedMessages);
                } else {
                    this.isUnreadedMessages = false;
                    this.isUnreadedMessagesChange.emit(this.isUnreadedMessages);
                }
            });
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
                    this.socketService.readChats(chat);
                },
                error: () => {
                    this.isLoading = false;
                    this.isLoadingChange.emit(this.isLoading);
                    this.isError = true;
                    this.isErrorChange.emit(this.isError);
                },
            });
        if (this.isUnreadedMessages) {
            this.chatsAndMessages
                .removeUnreadedChatsAndMessages(chatId)
                .subscribe(()=>{
                    this.socketService.readMessages(chatId);
                });
        }
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
