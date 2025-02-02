import { Component, input, Input } from '@angular/core';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { User } from '../../types/user';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-chats-searched-results',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './chats-searched-results.component.html',
    styleUrl: './chats-searched-results.component.css',
})
export class ChatsSearchedResultsComponent {
    @Input('userIdProp') userId: string = "";
    @Input('searchedResultsProp') searchedResults: User[] =[];

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
