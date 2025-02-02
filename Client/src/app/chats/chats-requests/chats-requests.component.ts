import { Component, Input } from '@angular/core';
import { Request } from '../../types/requests';
import { ChatsRequestsItemComponent } from "./chats-requests-item/chats-requests-item.component";
import { Chat } from '../../types/chats';

@Component({
  selector: 'app-chats-requests',
  standalone: true,
  imports: [ChatsRequestsItemComponent],
  templateUrl: './chats-requests.component.html',
  styleUrl: './chats-requests.component.css'
})
export class ChatsRequestsComponent {
    @Input("requestsProps") requests: Request[]=[];
    @Input("chatsProps") chats: Chat[]=[];
}
