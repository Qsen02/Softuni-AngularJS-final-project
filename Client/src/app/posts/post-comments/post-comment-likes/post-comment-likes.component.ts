import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUser, User } from '../../../types/user';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-comment-likes',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './post-comment-likes.component.html',
    styleUrl: './post-comment-likes.component.css'
})
export class PostCommentLikesComponent implements OnInit,OnDestroy {
    likes: User[] = [];
    isError = false;
    isLoading = false;
    curUser:AuthUser|null=null;

    commentSubscription:Subscription|null=null;

    constructor(private commentService: CommentService, 
        private route: ActivatedRoute, 
        private userService:UserService,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        const commentId = this.route.snapshot.params['commentId'];
        this.commentSubscription=this.commentService.getCommentById(commentId).subscribe({
            next: (comment) => {
                this.likes = comment.likes as User[];
                this.curUser=this.userService.getUser();
                this.isLoading = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })
    }

    onBack():void{
      history.back();
    }

    onError(event: Event) {
        const imgRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imgRef);
    }

    ngOnDestroy(): void {
        this.commentSubscription?.unsubscribe();
    }
}
