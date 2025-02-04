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

@Component({
    selector: 'app-chats',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ChatsSearchedResultsComponent,
        ChatsUserItemComponent,
        ChatsRequestsComponent,
    ],
    templateUrl: './chats.component.html',
    styleUrl: './chats.component.css',
})
export class ChatsComponent implements OnInit, OnDestroy {
    chats: Chat[] = [];
    requests: Request[] = [];
    chatSubscription: Subscription | null = null;
    userSubscription: Subscription | null = null;
    isLoading = false;
    isError = false;
    isSearched = false;
    searchedResults: User[] = [];
    userId = '';
    isInit = true;
    searchUserForm = new FormGroup({
        username: new FormControl(''),
    });
    isRequestsOpen = false;
    openChatParent: Chat | null = null;
    isChatOpenParent=false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const userId = this.route.snapshot.params['userId'];
        this.chatSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.isLoading = true;
                this.chats = user.chats;
                this.requests = user.requests;
                this.isLoading = false;
                this.userId = userId;
            },
            error: () => {
                this.isLoading = false;
                this.isError = true;
            },
        });
    }

    onSearch() {
        let username = this.searchUserForm.value.username;
        if (username == '') {
            username = 'No value';
        }
        this.isLoading = true;
        this.isInit = false;
        this.userSubscription = this.userService
            .searchUsers(username)
            .subscribe({
                next: (users) => {
                    this.isSearched = true;
                    this.searchedResults = users;
                    this.isLoading = false;
                    this.isRequestsOpen = false;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.isError = true;
                },
            });
    }

    openRequests() {
        const userId = this.route.snapshot.params['userId'];
        this.isInit = false;
        this.userSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.isLoading = true;
                this.requests = user.requests;
                this.isRequestsOpen = true;
                this.isLoading = false;
                this.isSearched = false;
            },
            error: () => {
                this.isLoading = false;
                this.isError = true;
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
    }
}
