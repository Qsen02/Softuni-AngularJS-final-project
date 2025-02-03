import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Request } from '../../../types/requests';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';
import { Chat } from '../../../types/chats';

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

    constructor(private requestsService: RequestsService) {}

    onAccept() {
        this.requestsService
            .acceptRequest(this.request?._id)
            .subscribe(({chat,request}) => {
                const requestIds=this.requests.map(el=>el._id);
                const index=requestIds.indexOf(request._id);
                this.requests.splice(index,1);
                this.chats.push(chat);
            });
    }

    onDecline() {
        this.requestsService
            .declineRequest(this.request?._id)
            .subscribe((request) => {
                const requestIds=this.requests.map(el=>el._id);
                const index=requestIds.indexOf(request._id);
                this.requests.splice(index,1);
            });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
