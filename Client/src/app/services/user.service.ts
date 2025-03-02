import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthUser, User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnDestroy {
    endpoint="users";
    private user$$ = new BehaviorSubject<AuthUser | null>(null);
    private user$ = this.user$$.asObservable();

    private user: AuthUser | null = null;
    userSubscribtion: Subscription | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
            this.user$$.next(this.user);
        }
        this.userSubscribtion = this.user$.subscribe((user) => {
            this.user = user;
        });
    }

    login(
        username: string | null | undefined,
        password: string | null | undefined
    ) {
        return this.http
            .post<AuthUser>(`/api/${this.endpoint}/login`, { username, password })
            .pipe(
                tap((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.user$$.next(user);
                })
            );
    }

    logout() {
        return this.http.get<AuthUser | null>(`/api/${this.endpoint}/logout`).pipe(
            tap((user) => {
                localStorage.removeItem('user');
                this.user$$.next(null);
            })
        );
    }

    register(
        username: string | null | undefined,
        email: string | null | undefined,
        password: string | null | undefined,
        repass: string | null | undefined
    ) {
        return this.http
            .post<AuthUser>(`/api/${this.endpoint}/register`, {
                username,
                email,
                password,
                repass,
            })
            .pipe(
                tap((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.user$$.next(user);
                })
            );
    }

    getUser(): AuthUser | null {
        return this.user;
    }

    getUserById(userId: User | undefined | string) {
        return this.http.get<User>(`/api/${this.endpoint}/${userId}`);
    }

    getUserPosts(userId: string) {
        return this.http.get<Post[]>(`/api/${this.endpoint}/${userId}/posts`);
    }

    searchUsers(query: string | null | undefined) {
        return this.http.get<User[]>(`/api/${this.endpoint}/search/${query}`);
    }

    getUserProfile(): Observable<AuthUser> {
        return this.http
            .get<AuthUser>('/api/users/me')
            .pipe(tap((user) => this.user$$.next(user)));
    }

    editUser(userId: string, data: {}) {
        return this.http.put(`/api/${this.endpoint}/update/${userId}`, data);
    }

    updateCurUser(username: string, email: string, profileImage: string) {
        this.user$$.next({
            _id: this.user!._id,
            username: username,
            email: email,
            profileImage: profileImage,
            accessToken: this.user!.accessToken,
        });
    }

    changeUserPassword(
        userId: string | null | undefined,
        newPassword: string | null | undefined
    ) {
        return this.http.put(`/api/${this.endpoint}/changePassword/${userId}`, {
            newPassword: newPassword,
        });
    }

    ngOnDestroy(): void {
        this.userSubscribtion?.unsubscribe();
    }
    
}
