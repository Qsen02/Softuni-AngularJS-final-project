import { Component, OnInit } from '@angular/core';
import { Post } from '../../../types/post';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfilePostCommentsComponent } from './profile-post-comments/profile-post-comments.component';
import { AuthUser } from '../../../types/user';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-post-details',
    standalone: true,
    imports: [ProfilePostCommentsComponent, RouterLink],
    templateUrl: './profile-post-details.component.html',
    styleUrl: './profile-post-details.component.css'
})
export class ProfilePostDetailsComponent implements OnInit {
    post: Post | null = null;
    isLoading = false;
    isError = false;
    curUser: AuthUser | null = null;
    isLiked = false;

    constructor(private postService: PostsService,
        private route: ActivatedRoute,
        private userService: UserService,
    ) { }

    checkStats() {
        this.isLiked = Boolean(this.post?.likes.find(el => el._id == this.curUser?._id));
    }

    ngOnInit(): void {
        this.isLoading = true;
        const postId = this.route.snapshot.params['postId'];
        this.postService.getPostById(postId).subscribe({
            next: (post) => {
                this.post = post;
                this.curUser = this.userService.getUser();
                this.isLoading = false;
                this.checkStats();
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })
    }

    onLike() {
        const postId = this.route.snapshot.params['postId'];
        this.postService.likePost(postId).subscribe((post) => {
            this.post = post;
            this.checkStats();
        })
    }

    onUnlike(){
        const postId = this.route.snapshot.params['postId'];
        this.postService.unlikePost(postId).subscribe((post) => {
            this.post = post;
            this.checkStats();
        })
    }

    onBack() {
        history.back();
    }
}
