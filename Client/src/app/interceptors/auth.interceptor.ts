import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorMessageService } from '../services/error-message.service';
import { Router } from '@angular/router';
import { enviromentProd } from '../../../enviroment/app.prod.js';
import { enviroment } from '../../../enviroment/app.enviroment';

const API = '/api';
// const { apiUrl } = enviroment;
const {apiUrl}=enviromentProd;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith(API)) {
        req = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials: true,
        });
    }

    const errorService = inject(ErrorMessageService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((err) => {
            if (err.status === 401) {
                router.navigate(['/login']);
            } else if (err.status === 403) {
                localStorage.removeItem('user');
            } else if (err.status === 404) {
                router.navigate(['/404']);
            } else {
                errorService.setError(err);
            }
            return throwError(() => err);
        })
    );
};
