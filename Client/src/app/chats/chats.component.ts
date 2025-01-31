import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../types/chats';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../types/requests';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../types/user';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit,OnDestroy{
    chats:Chat[] = [];
    requests:Request[]=[]
    chatSubscription: Subscription | null = null;
    userSubscription: Subscription | null = null
    isLoading=false;
    isError=false;
    isSearched=false;
    searchedResults:User[]=[];

    searchUserForm = new FormGroup({
        username: new FormControl("")
    })
    
    constructor(private userService: UserService, private route:ActivatedRoute){}

    ngOnInit(): void {
        const userId=this.route.snapshot.params['userId'];
        this.chatSubscription=this.userService.getUserById(userId).subscribe({
            next:(user)=>{
                this.isLoading=true;
                this.chats=user.chats;
                this.requests=user.requests;
                this.isLoading=false;
                console.log( this.chats);
            },
            error:()=>{
                this.isLoading=false;
                this.isError=true;
            }
        })
    }

    onSearch(){
        let username = this.searchUserForm.value.username;
		if (username == "") {
			username = "No value";
		}
		this.isLoading = true;
		this.userSubscription = this.userService.searchUsers(username).subscribe({
			next: (users) => {
				this.isSearched = true;
				this.searchedResults = users;
				this.isLoading = false;
			},
			error: (err) => {
				this.isLoading = false;
				this.isError = true;
			}
		})
    }

    ngOnDestroy(): void {
        this.chatSubscription?.unsubscribe();
    }
}
