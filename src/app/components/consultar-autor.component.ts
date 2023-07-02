import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';

@Component({
  selector: 'app-consultar-autor',
  template: `<mat-card class="example-card">
    <mat-card-title>Consultar datos de Autores</mat-card-title>
    <mat-card-content>
      <button mat-button color="primary" routerLink="/editarautor/0">
        <span class="material-icons">add</span>Nuevo
      </button>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="codigo">
          <th mat-header-cell *matHeaderCellDef>Codigo</th>
          <td mat-cell *matCellDef="let element">{{ element.codigo }}</td>
        </ng-container>

        <ng-container matColumnDef="nombre">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let element">{{ element.nombre }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-button
              color="primary"
              routerLink="/editarautor/{{ element.codigo }}"
            >
              <i class="material-icons">edit</i>
            </button>

            <button mat-button color="primary" (click)="borrar(element.codigo)">
              <i class="material-icons">delete</i>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        class="example-paginator"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
      >
      </mat-paginator>
    </mat-card-content>
  </mat-card> `,
})
export class ConsultarAutorComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'actions'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.consultar();
  }
  consultar = () => {
    axios
      .get<any>('http://localhost:8080/PROYECTO-REST/rest/autor/list')
      .then((resultado) => {
        console.log(resultado.data);
        if (resultado.data['success'] == true) {
          this.dataSource = new MatTableDataSource(resultado.data['result']);
          this.dataSource['paginator'] = this.paginator;
        } else {
          this._snackBar.open(resultado.data['result'], ' ', {
            duration: 3000,
          });
        }
      });
  };

  borrar = (codigo: number) => {
    axios
      .delete<any>(
        `http://localhost:8080/PROYECTO-REST/rest/autor/delete/${codigo}`
      )
      .then((resultado) => {
        if (resultado.data['success'] == true) {
          this.consultar();
          this._snackBar.open(`Registro #${codigo} Borrado!`, ' ', {
            duration: 3000,
          });
        } else {
          this._snackBar.open(resultado.data['result'], ' ', {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this._snackBar.open(
          `Ocurrio un error al eliminar el registro, consulte con el administrador!`,
          ' ',
          {
            duration: 3000,
          }
        );
      });
  };
}
