import { Component, OnInit } from '@angular/core';
import { AuthUser, User } from '../../types/user';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-post-likes',
    standalone: true,
    imports: [],
    templateUrl: './post-likes.component.html',
    styleUrl: './post-likes.component.css'
})
export class PostLikesComponent implements OnInit {
    likes: User[] = [];
    user: AuthUser | null = null;
    isLoading=false;

    constructor(private postService: PostsService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.isLoading=true;
        const postId = this.route.snapshot.params['postId'];
        this.user=this.userService.getUser();
        this.postService.getPostById(postId).subscribe((post) => {
            this.likes = post.likes;
            this.isLoading=false;
        })
    }

    onBack() {
        this.router.navigate(['/home']);
    }
}
