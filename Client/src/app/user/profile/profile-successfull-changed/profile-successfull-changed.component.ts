import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profile-successfull-changed',
    standalone: true,
    imports: [],
    templateUrl: './profile-successfull-changed.component.html',
    styleUrl: './profile-successfull-changed.component.css'
})
export class ProfileSuccessfullChangedComponent {

    constructor(private route: ActivatedRoute, private router: Router) { }

    onBack() {
        const userId = this.route.snapshot.params["userId"];
        this.router.navigate([`/profile/${userId}`]);
    }
}
