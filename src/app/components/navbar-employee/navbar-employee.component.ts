import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-employee',
  templateUrl: './navbar-employee.component.html',
  styleUrls: ['./navbar-employee.component.css']
})
export class NavbarEmployeeComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}
