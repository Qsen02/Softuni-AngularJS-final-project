import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordPattern } from '../../utils/passRegexp';
import { matchPassword } from '../../utils/matchPassword.validator';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, ChangeVisabilityDirective, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
    isVisiblePass = false;
    isVisibleRepass = false;

    registerForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.minLength(2), Validators.email]),
        passGroup: new FormGroup({
            password: new FormControl("", [Validators.required, Validators.pattern(passwordPattern)]),
            repass: new FormControl("", Validators.required)
        }, {
            validators: [matchPassword("password", "repass")]
        }),
    });

    registerSubscription: Subscription | null = null;

    constructor(private userService: UserService, private router: Router) { }

    get getPassword() {
        return this.registerForm.get("passGroup")?.get("password");
    }

    get getRepass() {
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
        const username = this.registerForm.value.username;
        const email = this.registerForm.value.email;
        const password = this.registerForm.value.passGroup?.repass;
        const repass = this.registerForm.value.passGroup?.repass;
        this.registerSubscription = this.userService.register(username, email, password, repass).subscribe((user) => {
            this.registerForm.reset();
            this.router.navigate(['/home']);
        });
    }

    ngOnDestroy(): void {
        this.registerSubscription?.unsubscribe();
    }
}
