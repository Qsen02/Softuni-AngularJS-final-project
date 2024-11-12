import { Component } from '@angular/core';
import { Nav } from '../../types/navigation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  guestNav: Nav[] = [
    { link: "/", name: "Home" },
    { link: "/login", name: "Login" },
    { link: "/register", name: "Register" },
  ]
  userNav:Nav[]=[
    { link: "/", name: "home" },
    { link: "/create", name: "Create" },
    { link: "/profile", name: "Profile" },
    { link: "/logout", name: "Logout" },
  ]
}
