import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { SocketServiceService } from '../../services/socket-service.service';
import { Chat } from '../../types/chats';

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

    isUndreadChats = false;
    unreadedChats: Chat[] = [];

    constructor(
        private userService: UserService,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        const user = this.curUser;
        this.userService.getUserById(this.curUser?._id).subscribe((user) => {
            this.unreadedChats = user.unreadedChats;
            if (this.unreadedChats.length > 0) {
                this.isUndreadChats = true;
            }
        });
        this.socketService.connectSocket();
        this.socketService
        .onUnreadChats('show chats')
        .subscribe(({ userId, chat }) => {
            if (
                user?._id == userId &&
                location.pathname != `/chats/${userId}`
            ) {
                this.isUndreadChats = true;
                this.unreadedChats.push(chat);
                const chatIdsArray=this.unreadedChats.map((el) => el._id);
                if (!chatIdsArray.includes(chat._id)) {
                    this.unreadedChats.push(chat);
                }
            }
        });
    }

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    readChats() {
        this.isUndreadChats = false;
    }

    ngOnDestroy(): void {
        this.socketService.disconnectSocket();
    }
}
