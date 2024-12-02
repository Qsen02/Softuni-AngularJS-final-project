import { Component } from '@angular/core';
import { ChangeVisabilityDirective } from '../../../directives/change-visability.directive';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordPattern } from '../../../utils/passRegexp';

@Component({
    selector: 'app-profile-change-password',
    standalone: true,
    imports: [ChangeVisabilityDirective,ReactiveFormsModule],
    templateUrl: './profile-change-password.component.html',
    styleUrl: './profile-change-password.component.css'
})
export class ProfileChangePasswordComponent {
    isVisibleNewPass = false;

    changePassForm=new FormGroup({
       newPassword:new FormControl("",[Validators.required,Validators.pattern(passwordPattern)])
    })

    constructor(private userService:UserService,private router:Router,private route:ActivatedRoute){}

    onChangeNewPass() {
        if (this.isVisibleNewPass == false) {
            this.isVisibleNewPass = true;
        } else {
            this.isVisibleNewPass = false;
        }
    }

    onBack(event:Event){
        event.preventDefault();
        const userId=this.route.snapshot.params['userId'];
        this.router.navigate([`/profile/${userId}`]);
    }

    onChange(){
        const newPassword=this.changePassForm.value.newPassword;
        const userId=this.route.snapshot.params['userId'];
        this.userService.changeUserPassord(userId,newPassword).subscribe(()=>{
            this.changePassForm.reset();
            this.router.navigate([`/profile/${userId}`]);
        })
    }
}
