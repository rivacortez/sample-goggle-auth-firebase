import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatIconButton,
    MatIcon,
    MatButton,
    MatCardActions,
    MatCardTitle,
    MatLabel,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }


  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(user => console.log('Usuario logueado:', user))
      .catch(error => console.error('Error en Google Login:', error));
  }

  loginWithGithub() {
    this.authService.loginWithGithub()
      .then(user => console.log('Usuario logueado:', user))
      .catch(error => console.error('Error en GitHub Login:', error));
  }

  logout() {
    this.authService.logout()
      .then(() => console.log('Sesión cerrada'))
      .catch(error => console.error('Error al cerrar sesión:', error));
  }
}
