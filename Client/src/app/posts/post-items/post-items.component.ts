import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../types/post';
import { UserService } from '../../services/user.service';
import { AuthUser } from '../../types/user';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';
import { TimePipe } from '../../pipes/time.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main-posts',
    standalone: true,
    imports: [RouterLink,TimePipe],
    templateUrl: './post-items.component.html',
    styleUrl: './post-items.component.css'
})
export class MainPostsComponent implements OnInit,OnDestroy {
    @Input("postProp") post: Post | null = null;
    isUser = false;
    user: AuthUser | null = null;
    isLiked = false;
    isOwner = false;

    likeSubscription:Subscription|null=null;
    unlikeSubscription:Subscription|null=null;

    constructor(private userService: UserService, private postsService: PostsService) { }

    checkStats() {
        this.isLiked = Boolean(this.post?.likes.find((el) => el._id == this.user?._id));
        this.isOwner = this.post?.ownerId._id == this.user?._id;
    }

    ngOnInit(): void {
        this.user = this.userService.getUser();
        this.isUser = this.userService.isLogged;
        this.checkStats();
    }

    like(): void {
        this.likeSubscription=this.postsService.likePost(this.post?._id).subscribe((post) => {
            this.post = post;
            this.checkStats();
        });
    }

    unlike(): void {
        this.unlikeSubscription=this.postsService.unlikePost(this.post?._id).subscribe((post) => {
            this.post = post;
            this.checkStats();
        });
    }

    ngOnDestroy(): void {
        this.likeSubscription?.unsubscribe();
        this.unlikeSubscription?.unsubscribe();
    }
}
