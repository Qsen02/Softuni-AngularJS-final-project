import { Component, OnInit } from '@angular/core';
import { User } from '../../../types/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profile-image',
    standalone: true,
    imports: [],
    templateUrl: './profile-image.component.html',
    styleUrl: './profile-image.component.css'
})
export class ProfileImageComponent implements OnInit {
    user: User | null = null;
    isLoading = false;
    isError = false;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const userId = this.route.snapshot.params['userId'];
        this.isLoading = true;
        this.userService.getUserById(userId).subscribe({
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
}
