import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Employer } from 'src/app/interfaces/employer';

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent {
  createPostForm: FormGroup;
  employer: Employer;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.employer = this.sessionService.getSession('employer') as Employer;
    if (!this.employer) {
      this.router.navigate(['/employer-login']);
    }
  }

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const { title, description, location, salary } = this.createPostForm.value;
      const employerId = this.employer.uid;

      this.firestore.collection('employers').doc<Employer>(employerId).get().subscribe((doc) => {
        const companyName = (doc.data() as Employer)?.companyName || 'Unknown Company';
        
        this.firestore.collection('jobPosts').add({
          employerId,
          companyName,
          title,
          description,
          location,
          salary
        }).then(() => {
          console.log('Job post created successfully');
          this.router.navigate(['/employer-dashboard']);
        }).catch(error => {
          console.error('Error creating job post:', error);
        });
      });
    }
  }
}
