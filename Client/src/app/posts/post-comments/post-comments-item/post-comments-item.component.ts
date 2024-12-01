import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../types/comment';
import { UserService } from '../../../services/user.service';
import {  User } from '../../../types/user';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-post-comments-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './post-comments-item.component.html',
    styleUrl: './post-comments-item.component.css'
})
export class PostCommentsItemComponent implements OnInit {
    @Input("commentProp") comment: Comment | null = null;
    owner: User | null = null;
    isUser = false;
    curUserId: string | undefined = "";
    commentLikes:string[]=[]
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUserById(this.comment?.ownerId).subscribe((user) => {
            this.owner = user;
            this.isUser = this.userService.isLogged;
            this.commentLikes=this.comment?.likes as string[];
            this.curUserId = this.userService.getUser()?._id;
            console.log(this.comment);
        })
    }
}
