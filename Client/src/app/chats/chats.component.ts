import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../types/chats';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../types/requests';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../types/user';
import { imageProfileErrorHandler } from '../utils/imageErrorHandlers';
import { ChatsSearchedResultsComponent } from './chats-searched-results/chats-searched-results.component';
import { ChatsUserItemComponent } from './chats-user-item/chats-user-item.component';
import { ChatsRequestsComponent } from './chats-requests/chats-requests.component';
import { ChatsItemComponent } from './chats-item/chats-item.component';
import { SocketServiceService } from '../services/socket-service.service';
import { Message } from '../types/messages';

@Component({
    selector: 'app-chats',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ChatsSearchedResultsComponent,
        ChatsUserItemComponent,
        ChatsRequestsComponent,
        ChatsItemComponent,
    ],
    templateUrl: './chats.component.html',
    styleUrl: './chats.component.css',
})
export class ChatsComponent implements OnInit, OnDestroy {
    chats: Chat[] = [];
    requests: Request[] = [];
    chatSubscription: Subscription | null = null;
    userSubscription: Subscription | null = null;
    isLoadingParent = false;
    isErrorParent = false;
    isSearched = false;
    searchedResults: User[] = [];
    userId = '';
    isInit = true;
    searchUserForm = new FormGroup({
        username: new FormControl(''),
    });
    isRequestsOpen = false;
    openChatParent: Chat | null = null;
    isChatOpenParent = false;
    isLoadingChild = false;
    isErrorChild = false;
    unreadedMessagesParent:Message[]=[];
    isUnreadedMessagesParent=false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.isLoadingParent = true;
        const userId = this.route.snapshot.params['userId'];
        this.socketService.connectSocket();
        this.socketService
            .onSendRequest('request sended')
            .subscribe((request) => {
                if (userId == request.receiver_id) {
                    this.requests.push(request);
                }
            });
        this.socketService.onAccepRequest("add chat").subscribe(({chat,userId})=>{
            if(userId==this.userId){
                this.chats.push(chat);
            }
        })
        this.chatSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.chats = user.chats;
                this.requests = user.requests;
                this.userId = userId;
                this.isLoadingParent = false;
                this.unreadedMessagesParent = user.unreadedMessages;
                if (this.unreadedMessagesParent.length > 0) {
                    this.isUnreadedMessagesParent = true;
                } else {
                    this.isUnreadedMessagesParent = false;
                }
            },
            error: () => {
                this.isLoadingParent = false;
                this.isErrorParent = true;
            },
        });
    }

    onSearch() {
        let username = this.searchUserForm.value.username;
        if (username == '') {
            username = 'No value';
        }
        this.isLoadingParent = true;
        this.isInit = false;
        this.userSubscription = this.userService
            .searchUsers(username)
            .subscribe({
                next: (users) => {
                    this.isSearched = true;
                    this.searchedResults = users;
                    this.isRequestsOpen = false;
                    this.isChatOpenParent = false;
                    this.isLoadingParent = false;
                },
                error: (err) => {
                    this.isLoadingParent = false;
                    this.isErrorParent = true;
                },
            });
    }

    openRequests() {
        this.isLoadingParent = true;
        const userId = this.route.snapshot.params['userId'];
        this.isInit = false;
        this.userSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.requests = user.requests;
                this.isRequestsOpen = true;
                this.isSearched = false;
                this.isChatOpenParent = false;
                this.isLoadingParent = false;
            },
            error: () => {
                this.isLoadingParent = false;
                this.isErrorParent = true;
            },
        });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.chatSubscription?.unsubscribe();
        this.userSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
