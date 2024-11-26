import { Component, Input } from '@angular/core';
import { User } from '../../types/user';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './user-item.component.html',
    styleUrl: './user-item.component.css'
})
export class UserItemComponent {
    @Input("userProp") user: User | null = null;

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
