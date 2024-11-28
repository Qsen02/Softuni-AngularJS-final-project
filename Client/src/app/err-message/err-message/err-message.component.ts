import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'app-err-message',
  standalone: true,
  imports: [],
  templateUrl: './err-message.component.html',
  styleUrl: './err-message.component.css'
})
export class ErrMessageComponent implements OnInit{
   errorMessage:string|null="";

   constructor(private errService:ErrorMessageService){}

   ngOnInit(): void {
       this.errService.errorMessage$.subscribe((err)=>{
        this.errorMessage=err;
       })
   }

   onBack(){
       history.back();
   }
}
