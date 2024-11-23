import { Component, OnInit } from '@angular/core';
import { PostCommentsItemComponent } from './post-comments-item/post-comments-item.component';
import { PostsService } from '../../services/posts.service';
import { Comment } from '../../types/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-post-comments',
    standalone: true,
    imports: [PostCommentsItemComponent],
    templateUrl: './post-comments.component.html',
    styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent implements OnInit {
    comments: Comment[] = [];
    isLoading = false;
    isError = false;
    postOwner = "";
    isUser=false;
    constructor(private postService: PostsService, 
        private route: ActivatedRoute,
        private userService:UserService,
        private router:Router
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        const postId = this.route.snapshot.params['postId'];
        this.postService.getPostById(postId).subscribe({
            next: (post) => {
                this.comments = post.comments;
                this.postOwner=post.ownerId.username;
                this.isUser=this.userService.isLogged;
                this.isLoading = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })
    }

    onBack():void{
        this.router.navigate(["/home"]);
    }
}
