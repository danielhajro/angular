import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private sessionService: SessionService,
    private router: Router
  ) { }

  registerEmployer(companyName: string, email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          return this.firestore.collection('employers').doc(userId).set({
            companyName,
            email,
            password
          });
        } else {
          throw new Error('User ID not found');
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  registerEmployee(name: string, email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          return this.firestore.collection('employees').doc(userId).set({
            name,
            email,
            password
          });
        } else {
          throw new Error('User ID not found');
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  loginEmployee(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        if (!userId) {
          throw new Error('User ID not found');
        }
        return this.firestore.collection('employees').doc(userId).ref.get()
          .then(doc => {
            if (!doc.exists) {
              throw new Error('No such employee!');
            }
            console.log('Employee logged in successfully:', userCredential.user);
            this.sessionService.setSession('employee', {
              uid: userCredential.user?.uid,
              email: userCredential.user?.email
            });
          });
      })
      .catch(error => {
        console.error('Error logging in employee:', error);
        throw error;
      });
  }

  loginEmployer(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        if (!userId) {
          throw new Error('User ID not found');
        }
        return this.firestore.collection('employers').doc(userId).ref.get()
          .then(doc => {
            if (!doc.exists) {
              throw new Error('No such employer!');
            }
            console.log('Employer logged in successfully:', userCredential.user);
            this.sessionService.setSession('employer', {
              uid: userCredential.user?.uid,
              email: userCredential.user?.email
            });
          });
      })
      .catch(error => {
        console.error('Error logging in employer:', error);
        throw error;
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.sessionService.clearSession();
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}
