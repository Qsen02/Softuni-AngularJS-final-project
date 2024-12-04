import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit, OnDestroy {
    imagePattern = /^https?:\/\//;
    editProfileForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.minLength(2), Validators.email]),
        profileImage: new FormControl("", Validators.pattern(this.imagePattern))
    })

    getUserSubscription: Subscription | null = null;
    editSubscription: Subscription | null = null;

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const userId = this.route.snapshot.params['userId'];
       this.getUserSubscription= this.userService.getUserById(userId).subscribe((user) => {
            this.editProfileForm.get("username")?.setValue(user.username);
            this.editProfileForm.get("email")?.setValue(user.email);
            this.editProfileForm.get("profileImage")?.setValue(user.profileImage);
        })
    }

    onEdit() {
        const username = this.editProfileForm.value.username;
        const email = this.editProfileForm.value.email;
        const profileImage = this.editProfileForm.value.profileImage;
        const userId = this.route.snapshot.params['userId'];
        this.editSubscription=this.userService.editUser(userId, { username, email, profileImage }).subscribe(() => {
            this.editProfileForm.reset();
            this.router.navigate([`/profile/${userId}`]);
        })
        this.userService.updateCurUser(username!, email!, profileImage!);
    }

    onBack(event: Event) {
        event.preventDefault();
        const userId = this.route.snapshot.params['userId'];
        this.router.navigate([`/profile/${userId}`]);
    }

    ngOnDestroy(): void {
        this.getUserSubscription?.unsubscribe();
        this.editSubscription?.unsubscribe();
    }
}
