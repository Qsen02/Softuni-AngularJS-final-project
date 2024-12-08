import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink,RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    get curUser() {
        return this.userService.getUser();
    }

    get isLogged() {
        return this.userService.isLogged;
    }

    constructor(private userService: UserService) {}

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
