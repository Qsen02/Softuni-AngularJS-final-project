import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { passwordPattern } from '../../utils/passRegexp';
import { ErrMessageComponent } from '../../err-message/err-message/err-message.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ChangeVisabilityDirective, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    isVisible = false;

    loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        password: new FormControl("", [Validators.required, Validators.pattern(passwordPattern)])
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
        const { username, password } = this.loginForm.value;
        this.userService.login(username, password).subscribe((user) => {
            this.loginForm.reset();
            this.router.navigate(['/home']);
        });
    }

}
