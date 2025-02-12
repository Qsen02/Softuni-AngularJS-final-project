import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { SocketServiceService } from '../../services/socket-service.service';
import { Chat } from '../../types/chats';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    get curUser() {
        return this.userService.getUser();
    }

    get isLogged() {
        return this.userService.isLogged;
    }

    isUnreadedChats = false;
    unreadedChats: Chat[] = [];
    getUserSubscription: Subscription | null = null;

    constructor(
        private userService: UserService,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
        const user = this.curUser;
        this.getUserSubscription = this.userService
            .getUserById(this.curUser?._id)
            .subscribe((user) => {
                this.unreadedChats = user.unreadedChats;
                if (this.unreadedChats.length > 0) {
                    this.isUnreadedChats = true;
                }
            });
        this.socketService
            .onUnreadChats('show chats')
            .subscribe(({ userId, chat }) => {
                if (
                    user?._id == userId &&
                    location.pathname != `/chats/${userId}`
                ) {
                    this.isUnreadedChats = true;
                    const chatIdsArray = this.unreadedChats.map((el) => el._id);
                    if (!(chatIdsArray.includes(chat._id)) || chatIdsArray.length == 0) {
                        this.unreadedChats.push(chat);
                    }
                }
            });
        this.socketService.onReadChats('chats readed').subscribe((chat) => {
            this.unreadedChats = this.unreadedChats.filter(
                (el) => el._id != chat._id
            );
        });
    }

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    readChats() {
        const user = this.curUser;
        if (
            this.unreadedChats.length > 0 &&
            location.pathname != `/chats/${user?._id}`
        ) {
            this.isUnreadedChats = true;
        } else {
            this.isUnreadedChats = false;
        }
    }

    ngOnDestroy(): void {
        this.getUserSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
