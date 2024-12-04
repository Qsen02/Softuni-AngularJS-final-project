import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from '../../../types/comment';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';
import { RouterLink } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { TimePipe } from '../../../pipes/time.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-comments-item',
    standalone: true,
    imports: [RouterLink,TimePipe],
    templateUrl: './post-comments-item.component.html',
    styleUrl: './post-comments-item.component.css'
})
export class PostCommentsItemComponent implements OnInit,OnDestroy {
    @Input("commentProp") comment: Comment | null = null;
    owner: User | null = null;
    isUser = false;
    curUserId: string | undefined = "";
    commentLikes: string[] = []

    userSubscription:Subscription|null=null;
    likeSubscription:Subscription|null=null;
    unlikeSubscription:Subscription|null=null;

    constructor(private userService: UserService, private commentService: CommentService) { }

    checkStats() {
        this.commentLikes = this.comment?.likes as string[];
        this.curUserId = this.userService.getUser()?._id;
    }

    ngOnInit(): void {
        this.userSubscription=this.userService.getUserById(this.comment?.ownerId).subscribe((user) => {
            this.owner = user;
            this.isUser = this.userService.isLogged;
            this.checkStats();
        })
    }

    onLike() {
        const commentId = this.comment?._id;
        this.likeSubscription=this.commentService.likeComment(commentId).subscribe((comment) => {
            this.comment = comment;
            this.checkStats();
        })
    }

    onUnlike() {
        const commentId = this.comment?._id;
        this.unlikeSubscription=this.commentService.unlikeComment(commentId).subscribe((comment) => {
            this.comment = comment;
            this.checkStats();
        })
    }

    onError(event: Event) {
        const imageRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
        this.likeSubscription?.unsubscribe();
        this.unlikeSubscription?.unsubscribe();
    }
}
