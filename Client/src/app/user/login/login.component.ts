import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    isVisible = false;

    changeVisability(event: Event) {
        const target = event.target as HTMLElement
        const inputRef = target?.parentElement?.children[2] as HTMLInputElement;
        if (inputRef.type == "password") {
            inputRef.type = "text";
            this.isVisible = true;
        } else {
            inputRef.type = "password";
            this.isVisible = false;
        }
    }
}
