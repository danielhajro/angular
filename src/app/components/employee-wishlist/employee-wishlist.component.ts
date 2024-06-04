import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from 'src/app/services/session.service';
import { JobPost } from 'src/app/interfaces/job-post';
import { Employee } from 'src/app/interfaces/employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-wishlist',
  templateUrl: './employee-wishlist.component.html',
  styleUrls: ['./employee-wishlist.component.css']
})
export class EmployeeWishlistComponent implements OnInit {
  user: Employee | null = null;
  wishlistJobs: JobPost[] = [];

  constructor(
    private sessionService: SessionService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getSession('employee');
    if (this.user && this.user.uid) {
      this.loadWishlistJobs(this.user.uid);
    }
  }

  loadWishlistJobs(userId: string): void {
    this.firestore.collection('employee-wishlists').doc(userId).collection('jobs').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as JobPost;
        const id = a.payload.doc.id;
        console.log(`Loaded job with ID: ${id}`); // Logging job ID
        return { id, ...data };
      }))
    ).subscribe((jobs: JobPost[]) => {
      this.wishlistJobs = jobs;
    }, error => {
      console.error('Error loading wishlist jobs:', error);
    });
  }

  removeFromWishlist(job: JobPost): void {
    if (!job) {
      console.error('Job is undefined');
      return;
    }
    if (this.user && this.user.uid) {
      const userId = this.user.uid;
      const wishlistRef = this.firestore.collection('employee-wishlists').doc(userId).collection('jobs');
  
      wishlistRef.ref.where('title', '==', job.title)
        .where('description', '==', job.description)
        .where('location', '==', job.location)
        .where('salary', '==', job.salary)
        .where('companyName', '==', job.companyName)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.error('No matching job found in the wishlist');
            return;
          }
          snapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              console.log(`Successfully removed job from wishlist for user: ${userId}`);
              this.wishlistJobs = this.wishlistJobs.filter(wishlistJob => 
                wishlistJob.title !== job.title ||
                wishlistJob.description !== job.description ||
                wishlistJob.location !== job.location ||
                wishlistJob.salary !== job.salary ||
                wishlistJob.companyName !== job.companyName
              );
            }).catch(error => {
              console.error('Error removing job from wishlist: ', error);
            });
          });
        })
        .catch(error => {
          console.error('Error checking wishlist: ', error);
        });
    } else {
      console.error('User is not logged in');
    }
  }
  
  
}
