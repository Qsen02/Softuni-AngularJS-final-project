import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { enviroment } from '../../../enviroment/app.enviroment';
import { inject } from '@angular/core';
import { ErrorMessageService } from '../services/error-message.service';
import { Router } from '@angular/router';
import { production } from '../../../enviroment/production.environment';

// const { apiUrl } = enviroment;
const { apiUrl } = production;
const API = '/api';

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
            } else {
                errorService.setError(err);
            }
            return throwError(() => err);
        })
    );
};
