import { Component, Input } from '@angular/core';
import { Chat } from '../../types/chats';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';

@Component({
    selector: 'app-chats-item',
    standalone: true,
    imports: [RouterLink,CommonModule],
    templateUrl: './chats-item.component.html',
    styleUrl: './chats-item.component.css',
})
export class ChatsItemComponent {
    @Input('chatProp') chat: Chat | null = null;
    @Input('userIdProp') userId = '';

     onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
