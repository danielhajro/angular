import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from 'src/app/services/session.service';
import { JobPost } from 'src/app/interfaces/job-post';
import { Employee } from 'src/app/interfaces/employee';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent implements OnInit {
  jobId: string = '';
  jobPost: JobPost | undefined;
  employee: Employee = { uid: '', name: '', email: '' }; 
  phone: string = '';
  cvFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private sessionService: SessionService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const sessionEmployee = this.sessionService.getSession<Employee>('employee');
    console.log('Session Employee:', sessionEmployee); // Log the retrieved session data
  
    if (!sessionEmployee) {
      console.error('Employee not logged in');
      this.router.navigate(['/employee-login']);
      return;
    } else {
      this.employee = sessionEmployee;
    }
  
    this.jobId = this.route.snapshot.paramMap.get('jobId') || '';
    if (this.jobId) {
      this.loadJobPost();
    } else {
      console.error('Job ID is not provided');
      this.router.navigate(['/employee-dashboard']);
    }
  }
  

  loadJobPost(): void {
    this.firestore.collection('jobPosts').doc<JobPost>(this.jobId).valueChanges().subscribe(
      (post) => {
        if (post) {
          this.jobPost = post;
        } else {
          console.error('Job post not found');
          this.router.navigate(['/employee-dashboard']);
        }
      },
      (error) => {
        console.error('Error loading job post:', error);
        this.router.navigate(['/employee-dashboard']);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;
    }
  }

  onSubmit(): void {
    if (this.cvFile) {
      const filePath = `cv/${this.employee.email}_${this.jobId}_${this.cvFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.cvFile);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: string) => {
            this.saveApplication(url);
          });
        })
      ).subscribe();
    }
  }

  saveApplication(cvUrl: string): void {
    if (this.jobPost && this.employee) {
      if (!this.employee.uid) {
        console.error('Employee ID is undefined');
        return;
      }
  
      const application = {
        jobId: this.jobId,
        jobTitle: this.jobPost.title,
        employeeId: this.employee.uid,
        employeeName: this.employee.name,
        employeeEmail: this.employee.email,
        phone: this.phone,
        cvUrl: cvUrl,
        companyName: this.jobPost.companyName,
        applicationDate: new Date(),
        employerId: this.jobPost.employerId // Assuming jobPost has employerId
      };
  
      this.firestore.collection('jobApplies').add(application).then(() => {
        console.log('Application submitted successfully');
        this.router.navigate(['/employee-dashboard']);
      }).catch(error => {
        console.error('Error submitting application:', error);
      });
    } else {
      console.error('Job post or employee data is not loaded');
    }
  }
}
