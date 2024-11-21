import { Routes } from '@angular/router';
import { MainComponent } from './posts/posts.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { guestGuard } from '../guards/guest.guard';
import { userGuard } from '../guards/user.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: MainComponent },
    { path: "register", component: RegisterComponent,canActivate:[guestGuard] },
    { path: "login", component: LoginComponent, canActivate:[guestGuard] },
    { path: "logout", component: LogoutComponent, canActivate:[userGuard] },
    { path: "**", component: ErrorPageComponent },
];
