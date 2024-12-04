import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../types/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-image',
    standalone: true,
    imports: [],
    templateUrl: './post-image.component.html',
    styleUrl: './post-image.component.css'
})
export class PostImageComponent implements OnInit,OnDestroy {
    post: Post | null = null;
    isLoading=false;
    isError=false;

    postSubscription:Subscription|null=null;

    constructor(private postService: PostsService, private route: ActivatedRoute,private router:Router) { }

    ngOnInit(): void {
        const postId = this.route.snapshot.params['postId'];
        this.isLoading=true;
       this.postSubscription=this.postService.getPostById(postId).subscribe({
            next:(post)=>{
                this.post=post;
                this.isLoading=false;
            },
            error:(err)=>{
                console.log(err);
                this.isError=true;
                this.isLoading=false;
            }
        })
    }

    onBack(){
        this.router.navigate(['/home']);
    }

    ngOnDestroy(): void {
        this.postSubscription?.unsubscribe();
    }
}
