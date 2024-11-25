import { Component, OnInit } from '@angular/core';
import { Post } from '../../../types/post';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilePostCommentsComponent } from './profile-post-comments/profile-post-comments.component';

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
    constructor(private postService:PostsService, private route:ActivatedRoute,private router:Router){}

    ngOnInit(): void {
        this.isLoading=true;
        const postId=this.route.snapshot.params['postId'];
        this.postService.getPostById(postId).subscribe({
            next:(post)=>{
                this.post=post;
                this.isLoading=false;
            },
            error:(err)=>{
                this.isError=true;
                this.isLoading=false;
            }
        })
    }

    onBack(){
        const userId=this.route.snapshot.params['userId'];
        this.router.navigate([`/profile/${userId}`]);
    }
}
