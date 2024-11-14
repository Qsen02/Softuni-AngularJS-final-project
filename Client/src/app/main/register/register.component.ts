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
   isVisible=false;
  
   changeVisability(event:Event){
    const target =event.target as HTMLElement
      const inputRef=target?.parentElement?.children[2] as HTMLInputElement;
      if(inputRef.type=="password"){
        inputRef.type="text";
      }else{
        inputRef.type="password";
      }
   }
}
