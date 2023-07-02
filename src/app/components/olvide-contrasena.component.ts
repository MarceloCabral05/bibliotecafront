import { Component } from '@angular/core';

@Component({
  selector: 'app-olvide-contrasena',
  template: ` <mat-card class="example-card">
    <mat-card-title>Recuperación de cuenta</mat-card-title>
    <mat-card-content>
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Correo</mat-label>
        <input matInput [(ngModel)]="email" type="email" />
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-raised-button color="primary" (click)="onSubmit()">
        Enviar correo de recuperación
      </button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['../app.component.css'],
})
export class OlvideContrasenaComponent {
  email = '';

  onSubmit() {}
}
