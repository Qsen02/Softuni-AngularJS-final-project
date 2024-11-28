import { Component, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Nav } from '../../types/navigation';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthUser } from '../../types/user';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    get curUser(){
        return this.userService.getUser();
    }

    get isLogged(){
        return this.userService.isLogged;
    }

    constructor(private userService:UserService){}


    onError(event:Event){
        const imageRef=event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }
}
