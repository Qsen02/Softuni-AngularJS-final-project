import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
        username: new FormControl(""),
        password: new FormControl("")
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
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;
        this.userService.login(username, password);
        this.loginForm.reset();
        this.router.navigate(['/home']);
    }

}
