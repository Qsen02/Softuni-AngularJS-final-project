import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../types/user';
import { RouterLink } from '@angular/router';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';
import { Chat } from '../../../types/chats';
import { SocketServiceService } from '../../../services/socket-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chats-searched-resuts-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './chats-searched-resuts-item.component.html',
    styleUrl: './chats-searched-resuts-item.component.css',
})
export class ChatsSearchedResutsItemComponent implements OnInit, OnDestroy {
    @Input('userIdProps') userId: string = '';
    @Input('itemProps') item: User | null = null;
    @Input('chatsProps') chats: Chat[] = [];
    isSended = false;
    isChatExist = false;

    sendRequestSubscription: Subscription | null = null;

    constructor(
        private requestsService: RequestsService,
        private socketService: SocketServiceService
    ) {}

    checkStats() {
        this.isSended = Boolean(
            this.item?.requests?.find((el) => el.sender_id._id == this.userId)
        );
        this.isChatExist = Boolean(
            this.chats.find(
                (el) =>
                    el.requester_id._id == this.item?._id ||
                    el.receiver_id._id == this.item?._id
            )
        );
    }

    ngOnInit(): void {
        this.socketService.connectSocket();
        this.checkStats();
    }

    onSendRequest() {
        this.sendRequestSubscription = this.requestsService
            .sendRequest(this.item?._id)
            .subscribe((request) => {
                this.isSended = true;
                this.socketService.sendRequest(request);
            });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.socketService.disconnectSocket();
    }
}
