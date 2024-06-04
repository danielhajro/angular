import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from 'src/app/services/session.service';
import { JobApply } from 'src/app/interfaces/job-apply';

@Component({
  selector: 'app-employer-messages',
  templateUrl: './employer-messages.component.html',
  styleUrls: ['./employer-messages.component.css']
})
export class EmployerMessagesComponent implements OnInit {
  jobApplies: JobApply[] = [];
  employerId: string = '';

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {}

  ngOnInit(): void {
    const sessionEmployer = this.sessionService.getSession<any>('employer');
    if (!sessionEmployer || !sessionEmployer.uid) {
      console.error('Employer not logged in');
      return;
    }
    
    this.employerId = sessionEmployer.uid;
    this.loadJobApplications();
  }

  loadJobApplications(): void {
    this.firestore.collection<JobApply>('jobApplies', ref => ref.where('employerId', '==', this.employerId)).valueChanges().subscribe(
      (applies) => {
        this.jobApplies = applies;
      },
      (error) => {
        console.error('Error loading job applications:', error);
      }
    );
  }
}
