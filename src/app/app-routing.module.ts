import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { RegistrationFrontComponent } from './components/registration-front/registration-front.component';
import { EmployerLoginComponent } from './components/employer-login/employer-login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { CreateJobPostComponent } from './components/create-job-post/create-job-post.component';
import { EditJobPostComponent } from './components/edit-job-post/edit-job-post.component';
import { JobApplyComponent } from './components/job-apply/job-apply.component';
import { EmployerMessagesComponent } from './components/employer-messages/employer-messages.component';
import { EmployeeAppliedJobsComponent } from './components/employee-applied-jobs/employee-applied-jobs.component';
import { EmployeeWishlistComponent } from './components/employee-wishlist/employee-wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'registration-front', component: RegistrationFrontComponent },
  { path: 'employee-login', component: EmployeeLoginComponent },  
  { path: 'employer-login', component: EmployerLoginComponent }, 
  {path: 'home',component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component:ContactComponent},
  {path:'employee-dashboard', component:EmployeeDashboardComponent},
  {path:'employer-dashboard', component:EmployerDashboardComponent},
  { path: 'new-post', component: CreateJobPostComponent },
  { path: 'edit-job-post/:id', component: EditJobPostComponent },
  { path: 'job-apply/:jobId',component: JobApplyComponent },
  {path:'employer-messages' ,component:EmployerMessagesComponent},
  {path:'employee-applied-jobs', component:EmployeeAppliedJobsComponent},
  { path: 'employee-wishlist', component: EmployeeWishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
