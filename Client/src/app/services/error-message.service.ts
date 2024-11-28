import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageService {
    private errorMessage$$ = new BehaviorSubject<string | null>(null);
    public errorMessage$ = this.errorMessage$$.asObservable();

    constructor() { }

    setError(err:any): void {
        if (err instanceof HttpErrorResponse) {
            this.errorMessage$$.next(err.error.message);
        } else if (err instanceof Error) {
            this.errorMessage$$.next(err.message);
        } else {
            this.errorMessage$$.next("Error occurs!");
        }
    }
}
