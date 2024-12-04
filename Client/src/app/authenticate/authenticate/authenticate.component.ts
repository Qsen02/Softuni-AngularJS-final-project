import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-authenticate',
    standalone: true,
    imports: [],
    templateUrl: './authenticate.component.html',
    styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit,OnDestroy {
    isAuthenticate=true;

    userSubscription:Subscription|null=null;
    constructor(private userService:UserService){}

    ngOnInit(): void {
        this.userSubscription=this.userService.getUserProfile().subscribe({
            next:()=>{
                this.isAuthenticate=false;
            },
            error:(err)=>{
                this.isAuthenticate=false;
            },
            complete:()=>{
                this.isAuthenticate=false;
            }
        })
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
    }
}
