import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  template: ` <mat-card class="example-card">
    <mat-card-title>Iniciar sesión</mat-card-title>
    <mat-card-content>
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Correo</mat-label>
        <input matInput [(ngModel)]="username" type="text" />
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Contraseña</mat-label>
        <input matInput [(ngModel)]="password" type="password" />
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-raised-button color="primary" (click)="onSubmit()">
        Iniciar sesion
      </button>
    </mat-card-actions>
    <a mat-button routerLink="/olvide-contrasena">Olvidaste tu contraseña?</a>
  </mat-card>`,
  styleUrls: ['../app.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    axios
      .post('http://localhost:8080/PROYECTO-REST/rest/usuario/login', {
        username: this.username,
        password: this.password,
      })
      .then((response: any) => {
        if (response.data.success) {
          this.snackBar.open('Inicio de sesión exitoso', '', {
            duration: 3000,
          });
          const token = this.tokenGenerator(10);
          localStorage.setItem('token', token);
          this.router.navigate(['/inicio']);
        } else {
          this.snackBar.open('Credenciales inválidas', '', {
            duration: 3000,
          });
        }
      });
  }

  tokenGenerator(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
}
