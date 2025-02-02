import { Component, Input } from '@angular/core';
import { Request } from '../../types/requests';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chats-requests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chats-requests.component.html',
  styleUrl: './chats-requests.component.css'
})
export class ChatsRequestsComponent {
    @Input("requestsProps") requests: Request[]=[];
}
