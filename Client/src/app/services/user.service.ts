import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser, User } from '../types/user';
import { enviroment } from '../enviroment/app.enviroment';
import { Observable } from 'rxjs';

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
        try {
            this.http.post<AuthUser>(`${enviroment.apiUrl}/users/login`, { username, password }).subscribe((user) => {
                this.user = user;
                localStorage.setItem(this.USER_TOKEN, JSON.stringify(this.user));
            })
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                throw new Error(err.error.message);
            }
        }
    }

    logout(): void {
        localStorage.removeItem(this.USER_TOKEN);
        this.user = null;
    }

    register(
        username: string | null | undefined,
        email: string | null | undefined,
        password: string | null | undefined,
        repass: string | null | undefined
    ): void {
        this.http.post<AuthUser>(`${enviroment.apiUrl}/users/register`, { username, email, password, repass }).subscribe((user) => {
            this.user = user;
            localStorage.setItem(this.USER_TOKEN, JSON.stringify(this.user));
        })
    }

    getUser(): AuthUser | null {
        if (typeof (this.user) == "string") {
            this.user = JSON.parse(this.user);
        }
        return this.user;
    }

    getUserById(userId:User|undefined):Observable<User>{
        return this.http.get<User>(`${enviroment.apiUrl}/users/${userId}`);
    }

    getUserPosts(userId:string):Observable<User[]>{
        return this.http.get<User[]>(`${enviroment.apiUrl}/users/${userId}/posts`);
    }
}
