import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-editar-cliente',
  template: `<mat-card class="example-card">
    <mat-card-title>Editar Cliente</mat-card-title>
    <mat-card-subtitle
      >Edite los datos y luego presione el botón Guardar</mat-card-subtitle
    >
    <mat-card-content>
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Codigo</mat-label>
        <input matInput placeholder="Codigo" value="{{ id }}" readonly="true" />
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Nombre</mat-label>
        <input
          matInput
          placeholder="Escriba el nombre del cliente"
          [(ngModel)]="nombre"
        />
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Ciudad</mat-label>
        <mat-select [(ngModel)]="ciudad">
          <mat-option *ngFor="let ciudad of ciudades" [value]="ciudad.codigo">
            {{ ciudad.descripcion }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Direccion</mat-label>
        <input
          matInput
          placeholder="Escriba la direccion del cliente"
          [(ngModel)]="direccion"
        />
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Observación</mat-label>
        <input matInput placeholder="Observacion" [(ngModel)]="obs" />
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-raised-button color="primary" (click)="guardarCliente()">
        Guardar
      </button>
      <button mat-raised-button routerLink="/consultarcliente">Volver</button>
    </mat-card-actions>
  </mat-card> `,
  styleUrls: ['../app.component.css'],
})
export class EditarClienteComponent implements OnInit {
  id: any;
  nombre: any;
  direccion: any;
  ciudad: any;
  ciudades: any;
  obs: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    this.consultarCiudad();

    if (this.id > 0) {
      axios
        .get<any>(
          `http://localhost:8080/PROYECTO-REST/rest/cliente/find/${this.id}`
        )
        .then((resultado) => {
          if (resultado.data['success'] == true) {
            this.nombre = resultado.data['result']['nombre'];
            this.direccion = resultado.data['result']['direccion'];
            this.ciudad = resultado.data['result']['ciudad']['codigo'];
            this.obs = resultado.data['result']['obs'];
          }
        });
    }
  }

  consultarCiudad = () => {
    axios
      .get<any>('http://localhost:8080/PROYECTO-REST/rest/ciudad/list')
      .then((resultado) => {
        if (resultado.data['success'] == true) {
          this.ciudades = resultado.data['result'];
        } else {
          this._snackBar.open(resultado.data['result'], '', { duration: 3000 });
        }
      });
  };

  guardarCliente = () => {
    const clienteUpdate = {
      codigo: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      obs: this.obs,
      ciudad: { codigo: this.ciudad },
    };

    axios
      .put(
        'http://localhost:8080/PROYECTO-REST/rest/cliente/update',
        clienteUpdate
      )
      .then((resultado: any) => {
        //console.log(resultado.data);
        this._snackBar.open(
          `Registro guardado #${resultado.data['result']['codigo']}`,
          '',
          { duration: 3000 }
        );

        this.router.navigate(['/consultarcliente']);
      });
  };
}
