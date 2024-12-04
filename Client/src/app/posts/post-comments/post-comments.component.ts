import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostCommentsItemComponent } from './post-comments-item/post-comments-item.component';
import { PostsService } from '../../services/posts.service';
import { Comment } from '../../types/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-comments',
    standalone: true,
    imports: [PostCommentsItemComponent, ReactiveFormsModule],
    templateUrl: './post-comments.component.html',
    styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent implements OnInit,OnDestroy {
    comments: Comment[] = [];
    isLoading = false;
    isError = false;
    postOwner = "";
    isUser = false;

    commentForm = new FormGroup({
        content: new FormControl("", Validators.required)
    })

    postSubscription:Subscription|null=null;
    commentSubscription:Subscription|null=null;

    constructor(
        private postService: PostsService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private commentService:CommentService
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        const postId = this.route.snapshot.params['postId'];
        this.postSubscription=this.postService.getPostById(postId).subscribe({
            next: (post) => {
                this.comments = post.comments;
                this.postOwner = post.ownerId.username;
                this.isUser = this.userService.isLogged;
                this.isLoading = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })
    }

    onComment() {
        const content=this.commentForm.value.content;
        const postId = this.route.snapshot.params['postId'];
        this.commentSubscription=this.commentService.createComment(postId,content).subscribe((newComment)=>{
            this.comments.push(newComment);
            this.commentForm.reset();
        })
    }

    onBack(): void {
        this.router.navigate(["/home"]);
    }

    ngOnDestroy(): void {
        this.postSubscription?.unsubscribe();
        this.commentSubscription?.unsubscribe();
    }
}
