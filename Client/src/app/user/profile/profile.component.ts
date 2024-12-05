import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../types/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthUser, User } from '../../types/user';
import { imageErrorHandler, imageProfileErrorHandler } from '../../utils/imageErrorHandlers';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    isLoadingPosts = false;
    isLoadingProfile = false;
    isError = false;
    userProfile: User | null = null;
    curUser: AuthUser | null = null;

    userPostsSubscription: Subscription | null = null;
    userSubscription: Subscription | null = null;

    constructor(private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit(): void {
        this.isLoadingProfile = true;
        const userId = this.route.snapshot.params['userId'];
        this.userPostsSubscription = this.userService.getUserPosts(userId).subscribe({
            next: (posts) => {
                this.posts = posts;
                this.isLoadingProfile = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoadingProfile = false;
            }
        })
        this.isLoadingPosts = true;
        this.userSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.userProfile = user;
                this.curUser = this.userService.getUser();
                this.isLoadingPosts = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoadingPosts = false;
            }
        })
    }

    onError(event: Event) {
        const imgRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imgRef);
    }

    onImageError(event:Event){
        const imgRef = event.target as HTMLImageElement;
        imageErrorHandler(imgRef);
    }

    ngOnDestroy(): void {
        this.userPostsSubscription?.unsubscribe();
        this.userSubscription?.unsubscribe();
    }
}
