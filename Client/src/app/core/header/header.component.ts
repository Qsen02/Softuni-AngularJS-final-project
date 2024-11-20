import { Component, OnChanges, OnInit } from '@angular/core';
import { Nav } from '../../types/navigation';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    isUser=false;
    constructor(private userService:UserService){}

    ngOnInit(): void {
        this.isUser=this.userService.isLogged;
    }
}
