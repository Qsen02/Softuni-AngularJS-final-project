import { Component, OnInit, signal } from '@angular/core';
import { Post } from '../types/post';
import { PostsService } from '../services/posts.service';
import { MainPostsComponent } from './main-posts/main-posts.component';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [MainPostsComponent],
	templateUrl: './main.component.html',
	styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
	posts: Post[] = [];
	isLoading = signal(false);
	isError = signal(false);

	constructor(private postApi: PostsService) { }

	ngOnInit(): void {
		this.isLoading.set(true);
		this.postApi.getAllPosts().subscribe({
			next: (posts) => {
				this.posts = posts;
				this.isLoading.set(false);
			},
			error: err => {
				this.isError.set(true);
				console.log(this.isError());
			}
		});
	}
}
