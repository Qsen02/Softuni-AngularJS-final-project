import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Request } from '../../../types/requests';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';
import { Chat } from '../../../types/chats';
import { SocketServiceService } from '../../../services/socket-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chats-requests-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './chats-requests-item.component.html',
    styleUrl: './chats-requests-item.component.css',
})
export class ChatsRequestsItemComponent implements OnDestroy {
    @Input('requestProps') request: Request | null = null;
    @Input('chatsProps') chats: Chat[] = [];
    @Input('requestsProps') requests: Request[] = [];

    acceptRequestSubscription: Subscription | null = null;
    declineRequestSubscription: Subscription | null = null;

    constructor(
        private requestsService: RequestsService,
    ) {}

    onAccept() {
        this.acceptRequestSubscription = this.requestsService
            .acceptRequest(this.request?._id)
            .subscribe(({ chat, request }) => {
                const requestIds = this.requests.map((el) => el._id);
                const index = requestIds.indexOf(request._id);
                this.requests.splice(index, 1);
                this.chats.push(chat);
            });
    }

    onDecline() {
        this.declineRequestSubscription = this.requestsService
            .declineRequest(this.request?._id)
            .subscribe((request) => {
                const requestIds = this.requests.map((el) => el._id);
                const index = requestIds.indexOf(request._id);
                this.requests.splice(index, 1);
            });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.acceptRequestSubscription?.unsubscribe();
        this.declineRequestSubscription?.unsubscribe();
    }
}
