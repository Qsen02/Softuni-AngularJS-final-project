import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../types/user';
import { RouterLink } from '@angular/router';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';
import { Chat } from '../../../types/chats';

@Component({
    selector: 'app-chats-searched-resuts-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './chats-searched-resuts-item.component.html',
    styleUrl: './chats-searched-resuts-item.component.css',
})
export class ChatsSearchedResutsItemComponent implements OnInit {
    @Input('userIdProps') userId: string = '';
    @Input('itemProps') item: User | null = null;
    @Input('chatsProps') chats: Chat[] = [];
    isSended = false;
    isChatExist = false;

    constructor(private requestsService: RequestsService) {}

    checkStats() {
        this.isSended = Boolean(
            this.item?.requests.find((el) => el.sender_id._id == this.userId)
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
        this.checkStats();
    }

    onSendRequest() {
        this.requestsService.sendRequest(this.item?._id).subscribe(() => {
            this.isSended = true;
        });
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
