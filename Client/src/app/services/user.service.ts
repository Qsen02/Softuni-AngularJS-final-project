import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser, User } from '../types/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private user$$ = new BehaviorSubject<AuthUser | null>(null);
    private user$ = this.user$$.asObservable();

    user: AuthUser | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        this.user$.subscribe((user) => {
            this.user = user;
        })
    }

    login(username: string | null | undefined, password: string | null | undefined): Observable<AuthUser> {
        return this.http.post<AuthUser>("/api/users/login", { username, password })
            .pipe(tap((user) => this.user$$.next(user)));
    }

    logout(): Observable<AuthUser | null> {
        return this.http.get<AuthUser | null>("/api/users/logout").pipe(tap((user) => this.user$$.next(user)));
    }

    register(
        username: string | null | undefined,
        email: string | null | undefined,
        password: string | null | undefined,
        repass: string | null | undefined
    ): Observable<AuthUser> {
        return this.http.post<AuthUser>("/api/users/register", { username, email, password, repass })
        .pipe(tap((user)=>this.user$$.next(user)))
    }

    getUser(): AuthUser | null {
        if (typeof (this.user) == "string") {
            this.user = JSON.parse(this.user);
        }
        return this.user;
    }

    getUserById(userId: User | undefined): Observable<User> {
        return this.http.get<User>(`/api/users/${userId}`);
    }

    getUserPosts(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`/api/users/${userId}/posts`);
    }

    searchUsers(query: string | null | undefined): Observable<User[]> {
        return this.http.get<User[]>(`/api/users/search/${query}`);
    }

    getUserProfile() {
        return this.http.get<AuthUser>("/api/users/me")
            .pipe(tap((user) => this.user$$.next(user)));
    }
}
