import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../types/post';
import { UserService } from '../../services/user.service';
import { AuthUser, User } from '../../types/user';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main-posts',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './post-items.component.html',
    styleUrl: './post-items.component.css'
})
export class MainPostsComponent implements OnInit {
    @Input("postProp") post: Post | null = null;
    isUser = false;
    user: AuthUser | null = null;
    isLiked = false;
    isOwner = false;
    constructor(private userService: UserService, private postsService: PostsService) { }

    ngOnInit(): void {
        this.isUser = this.userService.isLogged;
        this.user = this.userService.getUser();
        this.isLiked = Boolean(this.post?.likes.find((el) => el._id == this.user?._id));
        this.isOwner = this.post?.ownerId._id == this.user?._id;
    }

    like(): void {
        this.postsService.likePost(this.post?._id);
    }

    unlike(): void {
        this.postsService.unlikePost(this.post?._id);
    }
}
