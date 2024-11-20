import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink,ChangeVisabilityDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    isVisible = false;

    onChange(){
        if(this.isVisible==false){
            this.isVisible=true;
        }else{
            this.isVisible=false;
        }
    }
}
