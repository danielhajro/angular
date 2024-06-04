import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployerRegistrationComponent } from './components/employer-registration/employer-registration.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environment/environment';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { RegistrationFrontComponent } from './components/registration-front/registration-front.component';
import { EmployerLoginComponent } from './components/employer-login/employer-login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarSimpleComponent } from './components/navbar-simple/navbar-simple.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { NavbarEmployerComponent } from './components/navbar-employer/navbar-employer.component';
import { CreateJobPostComponent } from './components/create-job-post/create-job-post.component';
import { EditJobPostComponent } from './components/edit-job-post/edit-job-post.component';
import { NavbarEmployeeComponent } from './components/navbar-employee/navbar-employee.component';
import { SessionService } from './services/session.service';
import { JobService } from './services/job.service';
import { JobApplyComponent } from './components/job-apply/job-apply.component';
import { EmployerMessagesComponent } from './components/employer-messages/employer-messages.component';
import { EmployeeAppliedJobsComponent } from './components/employee-applied-jobs/employee-applied-jobs.component';
import { EmployeeWishlistComponent } from './components/employee-wishlist/employee-wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployerRegistrationComponent,
    EmployeeRegistrationComponent,
    EmployeeLoginComponent,
    RegistrationFrontComponent,
    EmployerLoginComponent,
    HomeComponent,
    NavbarSimpleComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    EmployeeDashboardComponent,
    EmployerDashboardComponent,
    NavbarEmployerComponent,
    CreateJobPostComponent,
    EditJobPostComponent,
    NavbarEmployeeComponent,
    JobApplyComponent,
    EmployerMessagesComponent,
    EmployeeAppliedJobsComponent,
    EmployeeWishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FontAwesomeModule
  ],
  providers: [AngularFirestore,SessionService, JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
