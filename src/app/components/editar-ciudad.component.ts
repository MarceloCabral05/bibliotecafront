import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-editar-ciudad',
  template: `
    <mat-card class="example-card">
      <mat-card-title>Editar Ciudad</mat-card-title>
      <mat-card-subtitle
        >Edite los datos y luego presione el botón Guardar</mat-card-subtitle
      >
      <mat-card-content>
        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Codigo</mat-label>
          <input
            matInput
            placeholder="Codigo"
            value="{{ id }}"
            readonly="true"
          />
        </mat-form-field>

        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Descripcion</mat-label>
          <textarea
            matInput
            placeholder="Escriba la descripcion de la ciudad"
            [(ngModel)]="descripcion"
            name="descripcion"
          ></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="guardarCiudad()">
          Guardar
        </button>
        <button mat-raised-button routerLink="/consultarciudad">Volver</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['../app.component.css'],
})
export class EditarCiudadComponent implements OnInit {
  id: any;
  descripcion: any;

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
          'http://localhost:8080/PROYECTO-REST/rest/ciudad/find/' + this.id
        )
        .then((resultado) => {
          console.log('Resultados de la consola');
          //console.log(resultado.data);
          this.descripcion = resultado['data']['result']['descripcion'];
        });
    }
  }

  guardarCiudad = () => {
    const ciudadUpdate = {
      codigo: this.id,
      descripcion: this.descripcion,
    };

    axios
      .put(
        'http://localhost:8080/PROYECTO-REST/rest/ciudad/update',
        ciudadUpdate
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

        this.router.navigate(['/consultarciudad']);
      });
  };
}
