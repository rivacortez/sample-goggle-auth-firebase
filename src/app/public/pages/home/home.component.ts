import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../services/auth.service';
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbar,
    MatButton,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private router: Router,private authService: AuthService) {
    this.user$ = new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        subscriber.next(user);
      });
    });
  }

  ngOnInit(): void {}


  logout() {
    this.authService.logout()
      .then(() => console.log('Sesión cerrada'))
      .catch(error => console.error('Error al cerrar sesión:', error));
    this.router.navigate(['/login']);
  }
}
