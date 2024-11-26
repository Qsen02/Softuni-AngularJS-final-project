import { Component, OnInit } from '@angular/core';
import { Post } from '../types/post';
import { PostsService } from '../services/posts.service';
import { MainPostsComponent } from './post-items/post-items.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { UserItemComponent } from '../user/user-item/user-item.component';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [MainPostsComponent, ReactiveFormsModule,UserItemComponent],
	templateUrl: './posts.component.html',
	styleUrl: './posts.component.css'
})
export class MainComponent implements OnInit {
	searchUserForm = new FormGroup({
		username: new FormControl("")
	})

	posts: Post[] = [];
	isLoading = false;
	isError = false;
	isSearched = false;
	searchedResults: User[] | [] = [];

	constructor(private postApi: PostsService, private userService: UserService) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.postApi.getAllPosts().subscribe({
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
		if(username==""){
			username="No value";
		}
		this.userService.searchUsers(username).subscribe((users) => {
			this.isSearched = true;
			this.searchedResults = users;
		})
	}
}
