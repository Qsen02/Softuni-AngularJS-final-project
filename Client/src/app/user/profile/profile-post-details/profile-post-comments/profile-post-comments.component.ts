import { Component, Input, OnInit } from '@angular/core';
import { ProfilePostCommentItemComponent } from './profile-post-comment-item/profile-post-comment-item.component';
import { Comment } from '../../../../types/comment';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-profile-post-comments',
    standalone: true,
    imports: [ProfilePostCommentItemComponent],
    templateUrl: './profile-post-comments.component.html',
    styleUrl: './profile-post-comments.component.css'
})
export class ProfilePostCommentsComponent implements OnInit {
    @Input("commentsProp") comments: Comment[] | undefined = [];
    isUser = false;
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.isUser = this.userService.isLogged;
    }
}
