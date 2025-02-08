import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { SocketServiceService } from '../../services/socket-service.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit,OnDestroy{
    get curUser() {
        return this.userService.getUser();
    }

    get isLogged() {
        return this.userService.isLogged;
    }

    isUndreadChats=false;

    constructor(
        private userService: UserService,
        private socketService: SocketServiceService
    ) {}

    ngOnInit(): void {
        const user=this.curUser;
        this.socketService.connectSocket();
        this.socketService.onUnreadChats("show chats").subscribe((userId)=>{
            if(user?._id==userId){
                this.isUndreadChats=true;
            }
        })
    }

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    readChats(){
        this.isUndreadChats=false;
    }

    ngOnDestroy(): void {
        this.socketService.disconnectSocket();
    }
}
