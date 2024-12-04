import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../types/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { imageProfileErrorHandler } from '../../../utils/imageErrorHandlers';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile-image',
    standalone: true,
    imports: [],
    templateUrl: './profile-image.component.html',
    styleUrl: './profile-image.component.css'
})
export class ProfileImageComponent implements OnInit,OnDestroy {
    user: User | null = null;
    isLoading = false;
    isError = false;

    getUserSubscription:Subscription|null=null;
    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const userId = this.route.snapshot.params['userId'];
        this.isLoading = true;
        this.getUserSubscription=this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.user = user;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isError = true;
                this.isLoading = false;
            }
        })
    }

    onBack() {
        const userId = this.route.snapshot.params['userId'];
        this.router.navigate([`/profile/${userId}`]);
    }

    onError(event:Event){
        const imageRef=event.target as HTMLImageElement;
        imageProfileErrorHandler(imageRef);
    }

    ngOnDestroy(): void {
        this.getUserSubscription?.unsubscribe();
    }
}
