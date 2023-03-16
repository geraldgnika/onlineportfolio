import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import {
  doc,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObject: any; // Saves currently authenticated user object
  authedUser: any; // Saves 'uid'

  constructor(private firestore: Firestore, public database: AngularFirestore, public authentication: AngularFireAuth, public router: Router) {
    // Saves user's data in Local Storage if authenticated
    this.authentication.authState.subscribe(user => {
      if (user) {
        this.userObject = user;
        localStorage.setItem('user', JSON.stringify(user));

        // Fetch 'uid' from Collection 'users', for the currently authenticated user
        this.database.collection('users', ref => ref.where("uid", "==", this.userObject.uid)).valueChanges().subscribe(users => {
          for (let user of users) {
            this.authedUser = user;
          }
        })
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  async sign_in(email: string, password: string) {
    try {
      const data = await this.authentication.signInWithEmailAndPassword(email, password);
      this.fill_user_object(data.user);
      this.authentication.authState.subscribe(user => {
        if (user) {
          this.router.navigate(['/']);
        }
      });
    } catch (error) {
      alert("We could not sign you in for the moment!");
    }
  }

  // Get boolean value if user is signed in or no
  get is_signed_in(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Fills 'userObject' of Model 'User' with data from 'authState' when user signs in our signs up
  fill_user_object(user: any) {
    const userObject: User = {
      uid: user.uid,
      photoURL: user.photoURL,
    };
  }

  updateUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', 'hs641J9zyYHUh4WAFZKZ');
    return from(updateDoc(ref, { ...user }));
  }

  async sign_out() {
    await this.authentication.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
