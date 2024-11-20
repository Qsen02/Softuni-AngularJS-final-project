import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

    registerForm = new FormGroup({
        username: new FormControl(""),
        email: new FormControl(""),
        password: new FormControl(""),
        repass: new FormControl("")
    })

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
        const username = this.registerForm.value.username;
        const email = this.registerForm.value.email;
        const password = this.registerForm.value.password;
        const repass = this.registerForm.value.repass;
        this.userService.register(username, email, password, repass);
        this.registerForm.reset();
        this.router.navigate(['/home']);
    }
}
