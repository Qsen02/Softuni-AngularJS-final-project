import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { passwordPattern } from '../../utils/passRegexp';
import { matchPassword } from '../../utils/matchPassword.validator';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, ChangeVisabilityDirective, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    isVisiblePass = false;
    isVisibleRepass = false;
    isError = false;
    errorMessage = "";

    registerForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.minLength(2), Validators.email]),
        passGroup:new FormGroup({
            password: new FormControl("", [Validators.required, Validators.pattern(passwordPattern)]),
            repass: new FormControl("", Validators.required)
        },{
            validators:[matchPassword("password","repass")]
        }),
    });

    constructor(private userService: UserService, private router: Router) { }

    get getPassword(){
        return this.registerForm.get("passGroup")?.get("password");
    }

    get getRepass(){
        return this.registerForm.get("passGroup")?.get("repass");
    }

    onChangePass() {
        if (this.isVisiblePass == false) {
            this.isVisiblePass = true;
        } else {
            this.isVisiblePass = false;
        }
    }

    onChangeRepass() {
        if (this.isVisibleRepass == false) {
            this.isVisibleRepass = true;
        } else {
            this.isVisibleRepass = false;
        }
    }

    onRegister(): void {
        try {
            const username = this.registerForm.value.username;
            const email =this.registerForm.value.email;
            const password = this.registerForm.value.passGroup?.repass;
            const repass = this.registerForm.value.passGroup?.repass;
            console.log(this.registerForm.value);
            if (!username || !email || !password || !repass) {
                throw new Error("All fields required!");
            }
            this.userService.register(username, email, password, repass);
            this.registerForm.reset();
            this.router.navigate(['/home']);
        } catch (err) {
            if (err instanceof Error) {
                this.isError = true;
                this.errorMessage = err.message;
            }
            return;
        }
    }
}
