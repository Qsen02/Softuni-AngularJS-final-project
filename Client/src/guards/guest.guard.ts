import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../app/services/user.service";
import { map } from "rxjs";

export const guestGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUserProfile().pipe(
        map((user) => {
            if (user) {
                console.log(user);
                router.navigate(['/home']);
                return false;
            }
            return true;
        })
    )
}