import { Component, OnInit } from '@angular/core';
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

  constructor(private postApi: PostsService) { }

  ngOnInit(): void {
    this.postApi.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts)
    })
  }
}
