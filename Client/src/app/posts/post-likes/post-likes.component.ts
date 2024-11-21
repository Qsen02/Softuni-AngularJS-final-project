import { Component, OnInit } from '@angular/core';
import { User } from '../../types/user';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-post-likes',
    standalone: true,
    imports: [],
    templateUrl: './post-likes.component.html',
    styleUrl: './post-likes.component.css'
})
export class PostLikesComponent implements OnInit {
    likes: User[] = [];
    constructor(private postService: PostsService, private route: ActivatedRoute,private router:Router) { }

    ngOnInit(): void {
        const postId = this.route.snapshot.params['postId'];
        this.postService.getPostById(postId).subscribe((post) => {
            this.likes = post.likes;
        })
    }

    onBack(){
        this.router.navigate(['/home']);
    }
}
