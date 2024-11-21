import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../app/services/user.service";

export const userGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const isLogged = userService.isLogged;
    const router=inject(Router);
    if (!isLogged) {
        router.navigate(["/login"]);
        return false;
    }
    return true;
}