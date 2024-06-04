import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {
  employer: any;
  jobPosts: any[] = [];

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employer = this.sessionService.getSession('employer');
    if (!this.employer) {
      this.router.navigate(['/employer-login']);
    } else {
      this.loadEmployerInfo();
      this.loadJobPosts();
    }
  }

  loadEmployerInfo(): void {
    const employerId = this.employer.uid;
    this.firestore.collection('employers').doc(employerId).valueChanges().subscribe(data => {
      this.employer = data;
    });
  }

  loadJobPosts(): void {
    const employerId = this.employer.uid;
    this.firestore.collection('jobPosts', ref => ref.where('employerId', '==', employerId))
      .snapshotChanges().subscribe(data => {
        this.jobPosts = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as object) 
          };
        });
      });
  }
    

  createPost(): void {
    this.router.navigate(['/create-job-post']);
  }

  editPost(postId: string): void {
    this.router.navigate(['/edit-job-post', postId]);
  }
  

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.firestore.collection('jobPosts').doc(postId).delete().then(() => {
        console.log('Post deleted successfully');
        this.loadJobPosts(); 
      }).catch(error => {
        console.error('Error deleting post:', error);
      });
    }
  }
}
