import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
    imagePattern = /^https?:\/\//;
    editProfileForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.minLength(2), Validators.email]),
        profileImage: new FormControl("", Validators.pattern(this.imagePattern))
    })

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const userId = this.route.snapshot.params['userId'];
        this.userService.getUserById(userId).subscribe((user) => {
            this.editProfileForm.get("username")?.setValue(user.username);
            this.editProfileForm.get("email")?.setValue(user.email);
            this.editProfileForm.get("profileImage")?.setValue(user.profileImage);
        })
    }

    onEdit(){
      const username=this.editProfileForm.value.username;
      const email=this.editProfileForm.value.email;
      const profileImage=this.editProfileForm.value.profileImage;
      const userId = this.route.snapshot.params['userId'];
      this.userService.editUser(userId,{username,email,profileImage}).subscribe(()=>{
        this.editProfileForm.reset();
        this.router.navigate([`/profile/${userId}`]);
      })
    }

    onBack(event:Event){
        event.preventDefault();
        const userId = this.route.snapshot.params['userId'];
        this.router.navigate([`/profile/${userId}`]);
    }
}
