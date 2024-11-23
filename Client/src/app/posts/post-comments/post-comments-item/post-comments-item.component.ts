import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../types/comment';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';

@Component({
    selector: 'app-post-comments-item',
    standalone: true,
    imports: [],
    templateUrl: './post-comments-item.component.html',
    styleUrl: './post-comments-item.component.css'
})
export class PostCommentsItemComponent implements OnInit {
    @Input("commentProp") comment: Comment | null = null;
    owner: User | null = null;
    constructor(private userService: UserService) { }

    ngOnInit(): void {
      this.userService.getUserById(this.comment?.ownerId).subscribe((user)=>{
        this.owner=user;
      })
    }
}
