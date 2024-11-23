import { Component } from '@angular/core';
import { User } from '../../../types/user';
import { CommentService } from '../../../services/comment.service';

@Component({
    selector: 'app-post-comment-likes',
    standalone: true,
    imports: [],
    templateUrl: './post-comment-likes.component.html',
    styleUrl: './post-comment-likes.component.css'
})
export class PostCommentLikesComponent {
    likes: User[] = [];

    constructor(private commentService:CommentService){}
}
