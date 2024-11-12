import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './main/error-page/error-page.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: MainComponent },
    { path: "**", component: ErrorPageComponent }
];
