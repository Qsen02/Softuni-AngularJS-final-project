import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ChangeVisabilityDirective, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    isError = false;
    errorMessage = "";
    isVisible = false;
    validationPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/;

    loginForm = new FormGroup({
        username: new FormControl("", [Validators.required,Validators.minLength(2)]),
        password: new FormControl("", [Validators.required, Validators.pattern(this.validationPass)])
    })

    constructor(private userService: UserService, private router: Router) { }

    onChange() {
        if (this.isVisible == false) {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }

    onLogin(): void {
        try {
            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;
            if (!username || !password) {
                throw new Error("All fields required!");
            }
            this.userService.login(username, password);
            this.loginForm.reset();
            this.router.navigate(['/home']);
        } catch (err) {
            if (err instanceof Error) {
                this.isError = true;
                this.errorMessage = err.message
            }
            return;
        }
    }

}
