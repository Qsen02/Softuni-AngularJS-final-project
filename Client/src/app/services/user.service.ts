import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from '../types/user';
import { enviroment } from '../enviroment/app.enviroment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user: AuthUser | null = null;
    USER_TOKEN = "user";

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        try {
            const user = JSON.stringify(localStorage.getItem(this.USER_TOKEN));
            this.user = JSON.parse(user);
        } catch (err) {
            this.user = null;
        }
    }

    login(username: string | null | undefined, password: string | null | undefined): void {
        this.http.post<AuthUser>(`${enviroment.apiUrl}/users/login`, { username, password }).subscribe((user) => {
            this.user = user;
            localStorage.setItem(this.USER_TOKEN, JSON.stringify(this.user));
        })
    }

    logout(): void {
        this.http.get(`${enviroment.apiUrl}/users/logout`).subscribe(() => {
            localStorage.removeItem(this.USER_TOKEN);
        });
    }

    register(
        username: string | null | undefined,
        email: string | null | undefined,
        password: string | null | undefined,
        repass: string | null | undefined
    ): void {
        this.http.post<AuthUser>(`${enviroment.apiUrl}/users/register`, { username,email, password,repass }).subscribe((user) => {
            this.user = user;
            localStorage.setItem(this.USER_TOKEN, JSON.stringify(this.user));
        })
    }
}
