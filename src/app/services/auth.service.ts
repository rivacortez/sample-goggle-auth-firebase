import { Injectable } from '@angular/core';
import {Auth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['/home']);
    });
  }

  loginWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['/home']);
    });
  }

  logout() {
    return signOut(this.auth);
  }
}
