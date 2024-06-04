import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-employer',
  templateUrl: './navbar-employer.component.html',
  styleUrls: ['./navbar-employer.component.css']
})
export class NavbarEmployerComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}
