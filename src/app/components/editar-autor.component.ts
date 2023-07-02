import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-editar-autor',
  template: `
    <mat-card class="example-card">
      <mat-card-title>Editar Autor</mat-card-title>
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
          <mat-label>Nombre</mat-label>
          <textarea
            matInput
            placeholder="Escriba el nomnbre del autor"
            [(ngModel)]="nombre"
            name="nombre"
          ></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="guardarAutor()">
          Guardar
        </button>
        <button mat-raised-button routerLink="/consultarautor">Volver</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class EditarAutorComponent implements OnInit {
  id: any;
  nombre: any;

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
          'http://localhost:8080/PROYECTO-REST/rest/autor/find/' + this.id
        )
        .then((resultado) => {
          console.log('Resultados de la consola');
          //console.log(resultado.data);
          this.nombre = resultado['data']['result']['nombre'];
        });
    }
  }

  guardarAutor = () => {
    console.log('Presionado guardar');
    const autorUpdate = {
      codigo: this.id,
      nombre: this.nombre,
    };

    axios
      .put('http://localhost:8080/PROYECTO-REST/rest/autor/update', autorUpdate)
      .then((resultado: any) => {
        console.log(resultado.data['result']);
        this._snackBar.open(
          `Registro Guardado  #${resultado.data['result']['codigo']}`,
          ' ',
          {
            duration: 3000,
          }
        );

        this.router.navigate(['/consultarautor']);
      });
  };
}
