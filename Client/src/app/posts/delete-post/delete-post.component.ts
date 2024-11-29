import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-delete-post',
    standalone: true,
    imports: [],
    templateUrl: './delete-post.component.html',
    styleUrl: './delete-post.component.css'
})
export class DeletePostComponent {
    constructor(private postService: PostsService, private route: ActivatedRoute) { }

    onBack() {
        history.back();
    }

    onDelete(){
        const postId=this.route.snapshot.params['postId'];
        this.postService.deletePost(postId).subscribe(()=>{
            history.back();
        })
    }
}
