import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
    validationPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/;

    registerForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.minLength(2), Validators.email]),
        password: new FormControl("", [Validators.required, Validators.pattern(this.validationPass)]),
        repass: new FormControl("", [Validators.required])
    },{
        validators:this.matchPassword()
    })

    matchPassword(): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const password = formGroup.get("password")?.value;
            const repass = formGroup.get("repass")?.value;
            return password == repass ? null : { passwordDontMatch: true };
        }
    }

    constructor(private userService: UserService, private router: Router) { }

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
            const email = this.registerForm.value.email;
            const password = this.registerForm.value.password;
            const repass = this.registerForm.value.repass;
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
