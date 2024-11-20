import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeVisabilityDirective } from '../../directives/change-visability.directive';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink,ChangeVisabilityDirective],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    isVisiblePass = false;
    isVisibleRepass = false;

    onChangePass(){
        if(this.isVisiblePass==false){
            this.isVisiblePass=true;
        }else{
            this.isVisiblePass=false;
        }
    }

    onChangeRepass(){
        if(this.isVisibleRepass==false){
            this.isVisibleRepass=true;
        }else{
            this.isVisibleRepass=false;
        }
    }
}
