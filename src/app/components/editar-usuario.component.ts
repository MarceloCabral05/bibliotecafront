import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-editar-usuario',
  template: `
    <mat-card class="example-card" style="max-width: 800px;">
      <mat-card-title>Editar Usuario </mat-card-title>
      <mat-card-subtitle
        >Edite los datos y luego presione el botón Guardar</mat-card-subtitle
      >
      <mat-card-content>
        <mat-form-field class="container" appearance="fill">
          <mat-label>Codigo</mat-label>
          <input
            matInput
            placeholder="Codigo"
            value="{{ id }}"
            readonly="true"
          />
        </mat-form-field>

        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Usuario</mat-label>
          <textarea
            matInput
            placeholder="Escriba el nomnbre del usuario"
            [(ngModel)]="username"
            name="username"
          ></textarea>
        </mat-form-field>

        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Contraseña</mat-label>
          <input
            matInput
            placeholder="Introduzca la seña"
            [(ngModel)]="password"
            name="password"
            [type]="hide ? 'password' : 'text'"
          />
          <button
            mat-icon-button
            matSuffix
            (click)="hide = !hide"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="hide"
          >
            <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="guardarUsuario()">
          Guardar
        </button>
        <button mat-raised-button routerLink="/consultarusuario">Volver</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class EditarUsuarioComponent implements OnInit {
  hide = true;
  id: any;
  username: any;
  password: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramens) => {
      this.id = paramens.id;
    });

    if (this.id > 0) {
      axios
        .get<any>(
          'http://localhost:8080/PROYECTO-REST/rest/usuario/find/' + this.id
        )
        .then((resultado) => {
          console.log('Resultados de la consola');
          //console.log(resultado.data);
          this.username = resultado['data']['result']['username'];
          this.password = resultado['data']['result']['password'];
        });
    }
  }

  guardarUsuario = () => {
    const usuarioUpdate = {
      codigo: this.id,
      username: this.username,
      password: this.password,
    };

    axios
      .put(
        'http://localhost:8080/PROYECTO-REST/rest/usuario/update',
        usuarioUpdate
      )
      .then((resultado: any) => {
        console.log(resultado.data['result']);
        this._snackBar.open(
          `Registro Guardado  #${resultado.data['result']['codigo']}`,
          ' ',
          {
            duration: 3000,
          }
        );

        this.router.navigate(['/consultarusuario']);
      });
  };
}
