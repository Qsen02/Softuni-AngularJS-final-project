import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../types/messages';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';

@Component({
    selector: 'app-message-item',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './message-item.component.html',
    styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit{
    @Input('messageProp') message: Message | null = null;
    @Input('userIdProp') userId = '';
    isMenuOpened = false;

    ngOnInit(): void {
        console.log(this.message);
    }

    openMenu() {
        if (this.isMenuOpened) {
            this.isMenuOpened = false;
        } else {
            this.isMenuOpened = true;
        }
    }

    onProfileImageError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
