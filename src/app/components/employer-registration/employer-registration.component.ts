import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-registration',
  templateUrl: './employer-registration.component.html',
  styleUrls: ['./employer-registration.component.css']
})
export class EmployerRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { companyName, email, password } = this.registrationForm.value;
      this.authService.registerEmployer(companyName, email, password)
        .then(() => {
          // Registration successful, you can redirect or show a success message
          console.log('Employer registered successfully');
          this.router.navigate(['/employer-login']);
        })
        .catch((error) => {
          // Registration failed, handle error
          console.error('Error registering employer:', error);
        });
    }
  }
}
