import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnDestroy {
    logoutSubscription: Subscription | null = null;

    constructor(private userService: UserService, private router: Router) { }

    onCancel(): void {
        history.back();
    }

    onLogout(): void {
        this.logoutSubscription=this.userService.logout().subscribe((user) => {
            this.router.navigate(['/login']);
        });
    }

    ngOnDestroy(): void {
        this.logoutSubscription?.unsubscribe();
    }
}
