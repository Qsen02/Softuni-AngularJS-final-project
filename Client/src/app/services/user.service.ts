import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthUser, User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnDestroy {
    private user$$ = new BehaviorSubject<AuthUser | null>(null);
    private user$ = this.user$$.asObservable();

    private user: AuthUser | null = null;
    userSubscribtion: Subscription | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        const storedUser=localStorage.getItem("user");
        if(storedUser){
            this.user=JSON.parse(storedUser);
            this.user$$.next(this.user);
        }
        this.userSubscribtion = this.user$.subscribe((user) => {
            this.user = user;
        })
    }

    login(username: string | null | undefined, password: string | null | undefined): Observable<AuthUser> {
        return this.http.post<AuthUser>("/api/users/login", { username, password })
            .pipe(tap((user) =>{
                localStorage.setItem("user",JSON.stringify(user))
                this.user$$.next(user)
    }));
    }

    logout(): Observable<AuthUser | null> {
        return this.http.get<AuthUser | null>("/api/users/logout").pipe(tap((user) =>{ 
            localStorage.removeItem("user");
            this.user$$.next(user)
        }));
    }

    register(
        username: string | null | undefined,
        email: string | null | undefined,
        password: string | null | undefined,
        repass: string | null | undefined
    ): Observable<AuthUser> {
        return this.http.post<AuthUser>("/api/users/register", { username, email, password, repass })
            .pipe(tap((user) => {
                localStorage.setItem("user",JSON.stringify(user));
                this.user$$.next(user)
            }))
    }

    getUser(): AuthUser | null {
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

    editUser(userId: string, data: {}) {
        return this.http.put(`/api/users/update/${userId}`, data);
    }

    updateCurUser(username: string, email: string, profileImage: string) {
        this.user$$.next({
            _id: this.user!._id,
            username: username,
            email: email,
            profileImage: profileImage,
            accessToken: this.user!.accessToken
        })
    }

    changeUserPassord(userId: string | null | undefined, newPassword: string | null | undefined) {
        return this.http.put(`/api/users/changePassword/${userId}`, { newPassword: newPassword });
    }

    ngOnDestroy(): void {
        this.userSubscribtion?.unsubscribe();
    }
}
