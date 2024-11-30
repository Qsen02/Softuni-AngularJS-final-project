import { Component, Input } from '@angular/core';
import { Comment } from '../../../../types/comment';
import { PostCommentsItemComponent } from '../../../../posts/post-comments/post-comments-item/post-comments-item.component';
import { AuthUser } from '../../../../types/user';
import { Post } from '../../../../types/post';
import { CommentService } from '../../../../services/comment.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile-post-comments',
    standalone: true,
    imports: [PostCommentsItemComponent,ReactiveFormsModule],
    templateUrl: './profile-post-comments.component.html',
    styleUrl: './profile-post-comments.component.css'
})
export class ProfilePostCommentsComponent {
    @Input("commentsProp") comments: Comment[] | undefined = [];
    @Input("errorProp") error=false;
    @Input("userProp") curUser:AuthUser|null=null;
    @Input("loadingProp") loading=false;
    @Input("postProp") post:Post|null=null;

    commentForm = new FormGroup({
        content: new FormControl("", Validators.required)
    })

    constructor(private commentService:CommentService,private route:ActivatedRoute){}

    onComment() {
        const content=this.commentForm.value.content;
        const postId = this.route.snapshot.params['postId'];
        this.commentService.createComment(postId,content).subscribe((newComment)=>{
            this.post?.comments.push(newComment);
            this.commentForm.reset();
        })
    }
}
