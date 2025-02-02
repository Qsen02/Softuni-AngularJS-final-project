import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Request } from '../../../types/requests';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';
import { Chat } from '../../../types/chats';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';

@Component({
    selector: 'app-chats-requests-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './chats-requests-item.component.html',
    styleUrl: './chats-requests-item.component.css',
})
export class ChatsRequestsItemComponent {
    @Input('requestProps') request: Request | null = null;
    @Input('chatsProps') chats: Chat[] = [];
    @Input('requestsProps') requests: Request[] = [];

    constructor(
        private requestsService: RequestsService,
        private userService: UserService
    ) {}

    onAccept() {
        this.requestsService
            .acceptRequest(this.request?._id)
            .subscribe((user) => {
                this.requests = user.requests;
                this.chats = user.chats;
            });
    }

    onDecline() {
        this.requestsService
            .declineRequest(this.request?._id)
            .subscribe((user) => {
                this.requests = user.requests;
            });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
