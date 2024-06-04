import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from 'src/app/services/session.service';
import { JobApply } from 'src/app/interfaces/job-apply';

@Component({
  selector: 'app-employee-applied-jobs',
  templateUrl: './employee-applied-jobs.component.html',
  styleUrls: ['./employee-applied-jobs.component.css']
})
export class EmployeeAppliedJobsComponent implements OnInit {
  jobApplies: JobApply[] = [];
  employeeId: string = '';

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {}

  ngOnInit(): void {
    const sessionEmployee = this.sessionService.getSession<any>('employee');
    if (!sessionEmployee || !sessionEmployee.uid) {
      console.error('Employee not logged in');
      return;
    }

    this.employeeId = sessionEmployee.uid;
    this.loadJobApplications();
  }

  loadJobApplications(): void {
    this.firestore.collection('jobApplies', ref => ref.where('employeeId', '==', this.employeeId)).snapshotChanges().subscribe(
      (snapshot) => {
        this.jobApplies = snapshot.map(doc => {
          const data = doc.payload.doc.data() as JobApply;
          const id = doc.payload.doc.id;
          return { id, ...data };
        });
      },
      (error) => {
        console.error('Error loading job applications:', error);
      }
    );
  }

  deleteApplication(applyId: string | undefined): void {
    if (applyId) {
      this.firestore.collection('jobApplies').doc(applyId).delete().then(() => {
        console.log('Application deleted successfully');
        this.loadJobApplications(); // Refresh the list after deletion
      }).catch(error => {
        console.error('Error deleting application:', error);
      });
    } else {
      console.error('Invalid application ID');
    }
  }
}
