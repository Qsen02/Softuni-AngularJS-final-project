import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { enviroment } from '../enviroment/app.enviroment';

const { apiUrl } = enviroment;
const API = "/api";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    if (req.url.startsWith(API)) {
        req = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials:true
        })
    }

    return next(req);
};
