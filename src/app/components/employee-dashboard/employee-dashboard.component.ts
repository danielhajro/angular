import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { JobPost } from 'src/app/interfaces/job-post';
import { Employee } from 'src/app/interfaces/employee'; // Import the Employee interface

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  user: Employee | null = null;
  employee: Employee | null = null;
  jobPosts: JobPost[] = [];
  filteredJobPosts: JobPost[] = [];
  filter: string = '';

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getSession('employee');
    if (!this.user) {
      this.router.navigate(['/employee-login']);
    } else {
      this.loadEmployeeInfo();
      this.loadAllJobs();
    }
  }

  loadEmployeeInfo(): void {
    this.employee = this.user;
  }

  loadAllJobs(): void {
    this.firestore.collection('jobPosts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as JobPost;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((posts: JobPost[]) => {
      console.log('Job posts with company names:', posts);
      this.jobPosts = posts;
      this.filteredJobPosts = posts;
    }, error => {
      console.error('Error loading job posts:', error);
    });
  }

  applyFilter(): void {
    if (this.filter) {
      this.filteredJobPosts = this.jobPosts.filter(post =>
        (post.title && post.title.toLowerCase().includes(this.filter.toLowerCase())) ||
        (post.description && post.description.toLowerCase().includes(this.filter.toLowerCase())) ||
        (post.companyName && post.companyName.toLowerCase().includes(this.filter.toLowerCase()))
      );
    } else {
      this.filteredJobPosts = this.jobPosts;
    }
  }

  onFilterChange(event: any): void {
    const filterValue = event?.target?.value || '';
    this.filter = filterValue.trim();
    this.applyFilter();
  }

  applyForJob(jobId: string | undefined): void {
    if (jobId) {
      this.router.navigate(['/job-apply', jobId]);
    } else {
      console.error('Job ID is undefined');
    }
  }

  addToWishlist(post: JobPost): void {
    if (!this.employee) {
      this.employee = this.sessionService.getSession('employee');
    }

    if (this.employee && this.employee.uid) {
      const userId = this.employee.uid;
      const wishlistRef = this.firestore.collection('employee-wishlists').doc(userId).collection('jobs');

      wishlistRef.ref.where('id', '==', post.id).get().then(snapshot => {
        if (snapshot.empty) {
          const wishlistItem = {
            ...post,
            employeeUid: this.employee?.uid
          };
          wishlistRef.add(wishlistItem)
            .then(() => {
              console.log('Job added to wishlist');
            })
            .catch(error => {
              console.error('Error adding job to wishlist: ', error);
            });
        } else {
          console.log('Job is already in the wishlist');
        }
      }).catch(error => {
        console.error('Error checking wishlist: ', error);
      });
    } else {
      console.error('User is not logged in or UID is null');
    }
  }
  
}
