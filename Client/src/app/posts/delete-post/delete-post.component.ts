import { Component, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-delete-post',
    standalone: true,
    imports: [],
    templateUrl: './delete-post.component.html',
    styleUrl: './delete-post.component.css'
})
export class DeletePostComponent implements OnDestroy{
    postSubscription:Subscription|null=null;

    constructor(private postService: PostsService, private route: ActivatedRoute,private router:Router) { }

    onBack() {
        history.back();
    }

    onDelete(){
        const postId=this.route.snapshot.params['postId'];
        this.postSubscription=this.postService.deletePost(postId).subscribe(()=>{
            this.router.navigate(['/home']);
        })
    }
    
    ngOnDestroy(): void {
        this.postSubscription?.unsubscribe();
    }
}
