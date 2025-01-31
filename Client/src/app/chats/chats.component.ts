import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../types/chats';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../types/requests';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit,OnDestroy{
    chats:Chat[] = [];
    requests:Request[]=[]
    chatSubscription: Subscription | null = null;
    isLoading=false;
    isError=false;
    constructor(private userService: UserService, private route:ActivatedRoute){}

    ngOnInit(): void {
        const userId=this.route.snapshot.params['userId'];
        this.chatSubscription=this.userService.getUserById(userId).subscribe({
            next:(user)=>{
                this.isLoading=true;
                this.chats=user.chats;
                this.requests=user.requests;
                this.isLoading=false;
                console.log(this.chats);
            },
            error:()=>{
                this.isError=true;
                this.isLoading=false;
            }
        })
    }

    ngOnDestroy(): void {
        this.chatSubscription?.unsubscribe();
    }
}
