import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../types/post';
import { PostsService } from '../services/posts.service';
import { MainPostsComponent } from './post-items/post-items.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { UserItemComponent } from '../user/user-item/user-item.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [MainPostsComponent, ReactiveFormsModule, UserItemComponent],
	templateUrl: './posts.component.html',
	styleUrl: './posts.component.css'
})
export class MainComponent implements OnInit,OnDestroy {
	searchUserForm = new FormGroup({
		username: new FormControl("")
	})

	posts: Post[] = [];
	isLoading = false;
	isError = false;
	isSearched = false;
	searchedResults: User[] | [] = [];

	postSubscription:Subscription|null=null;
	userSubscription:Subscription|null=null;

	constructor(private postApi: PostsService, private userService: UserService) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.postSubscription=this.postApi.getAllPosts().subscribe({
			next: (posts) => {
				this.posts = posts;
				this.isLoading = false;
			},
			error: err => {
				this.isError = true;
			}
		});
	}
	
	onSearch() {
		let username = this.searchUserForm.value.username;
		if (username == "") {
			username = "No value";
		}
		this.isLoading = true;
		this.userSubscription=this.userService.searchUsers(username).subscribe({
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
		this.postSubscription?.unsubscribe();
		this.userSubscription?.unsubscribe();
	}
}
