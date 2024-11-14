import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './main/error-page/error-page.component';
import { RegisterComponent } from './main/register/register.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: MainComponent },
    { path: "register", component:RegisterComponent},
    { path: "**", component: ErrorPageComponent },
];
