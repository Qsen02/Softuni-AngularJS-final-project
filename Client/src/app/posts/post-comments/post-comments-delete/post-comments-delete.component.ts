import { Component } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-comments-delete',
    standalone: true,
    imports: [],
    templateUrl: './post-comments-delete.component.html',
    styleUrl: './post-comments-delete.component.css'
})
export class PostCommentsDeleteComponent {

    constructor(private commentService: CommentService, private route: ActivatedRoute) { }

    onBack() {
        history.back();
    }

    onDelete() {
        const commentId = this.route.snapshot.params['commentId'];
        const postId = this.route.snapshot.params['postId'];
        this.commentService.deleteComment(commentId, postId).subscribe(() => {
            history.back();
        })
    }
}
