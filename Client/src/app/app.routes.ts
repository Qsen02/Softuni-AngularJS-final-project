import { Routes } from '@angular/router';
import { MainComponent } from './posts/posts.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: MainComponent },
    { path: "register", component:RegisterComponent},
    { path: "**", component: ErrorPageComponent },
];
