import { Component, input, Input, OnInit } from '@angular/core';
import { Comment } from '../../../../types/comment';
import { PostCommentsItemComponent } from '../../../../posts/post-comments/post-comments-item/post-comments-item.component';
import { AuthUser } from '../../../../types/user';

@Component({
    selector: 'app-profile-post-comments',
    standalone: true,
    imports: [PostCommentsItemComponent],
    templateUrl: './profile-post-comments.component.html',
    styleUrl: './profile-post-comments.component.css'
})
export class ProfilePostCommentsComponent {
    @Input("commentsProp") comments: Comment[] | undefined = [];
    @Input("errorProp") error=false;
    @Input("userProp") curUser:AuthUser|null=null;
    @Input("loadingProp") loading=false;
}
