import { Component, Input } from '@angular/core';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { Chat } from '../../types/chats';

@Component({
    selector: 'app-chats-user-item',
    standalone: true,
    imports: [],
    templateUrl: './chats-user-item.component.html',
    styleUrl: './chats-user-item.component.css',
})
export class ChatsUserItemComponent {
    @Input('userIdProp') userId: string = '';
    @Input('chatsProp') chats: Chat[] = [];

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
