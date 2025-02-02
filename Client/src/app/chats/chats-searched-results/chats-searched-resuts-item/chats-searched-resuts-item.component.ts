import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../types/user';
import { RouterLink } from '@angular/router';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { RequestsService } from '../../../services/requests.service';

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
    isSended = false;

    constructor(private requestsService: RequestsService) {}

    checkIsSended() {
        this.isSended = Boolean(
            this.item?.requests.find((el) => el.sender_id._id == this.userId)
        );
    }

    ngOnInit(): void {
        this.checkIsSended();
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
