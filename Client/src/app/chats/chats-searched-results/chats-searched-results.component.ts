import { Component, Input } from '@angular/core';
import { User } from '../../types/user';
import { ChatsSearchedResutsItemComponent } from './chats-searched-resuts-item/chats-searched-resuts-item.component';

@Component({
    selector: 'app-chats-searched-results',
    standalone: true,
    imports: [ChatsSearchedResutsItemComponent],
    templateUrl: './chats-searched-results.component.html',
    styleUrl: './chats-searched-results.component.css',
})
export class ChatsSearchedResultsComponent {
    @Input('userIdProp') userId: string = '';
    @Input('searchedResultsProp') searchedResults: User[] = [];
}
