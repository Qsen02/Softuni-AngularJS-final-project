import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../../types/comment';
import { UserService } from '../../../../services/user.service';
import { PostCommentsItemComponent } from '../../../../posts/post-comments/post-comments-item/post-comments-item.component';

@Component({
    selector: 'app-profile-post-comments',
    standalone: true,
    imports: [PostCommentsItemComponent],
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
