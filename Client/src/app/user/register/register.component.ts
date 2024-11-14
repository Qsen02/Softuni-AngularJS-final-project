import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    isVisiblePass = false;
    isVisibleRepass = false;

    changeVisability(event: Event) {
        const target = event.target as HTMLElement
        const inputRef = target?.parentElement?.children[2] as HTMLInputElement;
        if (inputRef.name == "password") {
            if (inputRef.type == "password") {
                inputRef.type = "text";
                this.isVisiblePass = true;
            } else {
                inputRef.type = "password";
                this.isVisiblePass = false;
            }
        } else if(inputRef.name=="repass"){
            if (inputRef.type == "password") {
                inputRef.type = "text";
                this.isVisibleRepass = true;
            } else {
                inputRef.type = "password";
                this.isVisibleRepass = false;
            }
        }
    }
}
