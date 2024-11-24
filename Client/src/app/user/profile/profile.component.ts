import { Component, OnInit } from '@angular/core';
import { Post } from '../../types/post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthUser, User } from '../../types/user';
import { imageProfileErrorHandler } from '../../utils/imageErrorHandlers';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    posts: Post[] = [];
    isLoading = false;
    isError = false;
    userProfile: User | null = null;
    curUser: AuthUser | null = null;

    constructor(private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit(): void {
        this.isLoading = true;
        const userId = this.route.snapshot.params['userId'];
        this.userService.getUserPosts(userId).subscribe({
            next: (posts) => {
                this.posts = posts;
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })

        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.userProfile = user;
                this.curUser = this.userService.getUser();
                this.isLoading = false;
            },
            error: (err) => {
                this.isError = true;
                this.isLoading = false;
            }
        })
    }
    onError(event: Event) {
        const imgRef = event.target as HTMLImageElement;
        imageProfileErrorHandler(imgRef);
    }
}
