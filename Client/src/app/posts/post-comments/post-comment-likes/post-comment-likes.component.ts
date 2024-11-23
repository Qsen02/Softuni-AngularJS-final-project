import { Component, OnInit } from '@angular/core';
import { AuthUser, User } from '../../../types/user';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-post-comment-likes',
    standalone: true,
    imports: [],
    templateUrl: './post-comment-likes.component.html',
    styleUrl: './post-comment-likes.component.css'
})
export class PostCommentLikesComponent implements OnInit {
    likes: User[] = [];
    isError = false;
    isLoading = false;
    curUser:AuthUser|null=null;

    constructor(private commentService: CommentService, 
        private route: ActivatedRoute, 
        private userService:UserService,
        private router:Router
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        const commentId = this.route.snapshot.params['commentId'];
        this.commentService.getCommentById(commentId).subscribe({
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
       const postId=this.route.snapshot.params['postId'];
       this.router.navigate([`/home/posts/${postId}/comments`])
    }
}
