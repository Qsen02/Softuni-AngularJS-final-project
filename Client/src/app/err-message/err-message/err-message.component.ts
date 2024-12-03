import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../services/error-message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-err-message',
    standalone: true,
    imports: [],
    templateUrl: './err-message.component.html',
    styleUrl: './err-message.component.css'
})
export class ErrMessageComponent implements OnInit {
    errorMessage: string | null = "";

    constructor(private errService: ErrorMessageService, private router: Router) { }

    ngOnInit(): void {
        this.errService.errorMessage$.subscribe((err) => {
            this.errorMessage = err;
        })
    }

    onBack() {
        if (this.errorMessage == "Resource not found!") {
            this.router.navigate(['/home']);
        } else {
            history.back();
        }
    }
}
