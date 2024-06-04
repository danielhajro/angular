import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-job-post',
  templateUrl: './edit-job-post.component.html',
  styleUrls: ['./edit-job-post.component.css']
})
export class EditJobPostComponent implements OnInit {
  editPostForm: FormGroup;
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.loadJobPost();
    }
  }

  loadJobPost(): void {
    if (this.postId) {
      this.firestore.collection('jobPosts').doc(this.postId).valueChanges().subscribe(data => {
        if (data && typeof data === 'object') {
          this.editPostForm.patchValue({
            ...data
          });
        } else {
          console.error('Invalid data received from Firestore:', data);
        }
      }, error => {
        console.error('Error loading job post:', error);
      });
    }
  }

  onSubmit(): void {
    if (this.editPostForm.valid && this.postId) {
      const { title, description, location, salary } = this.editPostForm.value;
      this.firestore.collection('jobPosts').doc(this.postId).update({
        title,
        description,
        location,
        salary
      }).then(() => {
        console.log('Job post updated successfully');
        this.router.navigate(['/employer-dashboard']);
      }).catch(error => {
        console.error('Error updating job post:', error);
      });
    }
  }
}
