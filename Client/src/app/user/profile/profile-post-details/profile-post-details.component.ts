import { Component, OnInit } from '@angular/core';
import { Post } from '../../../types/post';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilePostCommentsComponent } from './profile-post-comments/profile-post-comments.component';
import { AuthUser } from '../../../types/user';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-profile-post-details',
    standalone: true,
    imports: [ProfilePostCommentsComponent],
    templateUrl: './profile-post-details.component.html',
    styleUrl: './profile-post-details.component.css'
})
export class ProfilePostDetailsComponent implements OnInit{
    post: Post | null = null;
    isLoading=false;
    isError=false;
    curUser:AuthUser|null=null;
    constructor(private postService:PostsService, 
        private route:ActivatedRoute,
        private router:Router,
        private userService:UserService
    ){}

    ngOnInit(): void {
        this.isLoading=true;
        const postId=this.route.snapshot.params['postId'];
        this.postService.getPostById(postId).subscribe({
            next:(post)=>{
                this.post=post;
                this.curUser=this.userService.getUser();
                this.isLoading=false;
            },
            error:(err)=>{
                this.isError=true;
                this.isLoading=false;
            }
        })
    }

    onBack(){
        history.back();
    }
}
