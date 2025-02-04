import { Component, Input } from '@angular/core';
import { Chat } from '../../types/chats';

@Component({
    selector: 'app-chats-item',
    standalone: true,
    imports: [],
    templateUrl: './chats-item.component.html',
    styleUrl: './chats-item.component.css',
})
export class ChatsItemComponent {
    @Input('chatProp') chat: Chat | null = null;
    @Input('userIdProp') userId = '';
}
