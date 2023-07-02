import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-prestamo',
  template: `<h2>Listado de Préstamos</h2>
    <ul>
      <li *ngFor="let prestamo of prestamos">
        {{ prestamo.numero }} - {{ prestamo.fecha }}
        <button (click)="buscarPrestamo(prestamo.numero)">Editar</button>
        <button (click)="eliminarPrestamo(prestamo.numero)">Eliminar</button>
      </li>
    </ul>
    <hr />

    <h2>Editar Préstamo</h2>
    <div>
      <label>Número:</label>
      <input type="text" [(ngModel)]="prestamo.numero" />

      <label>Fecha:</label>
      <input type="date" [(ngModel)]="prestamo.fecha" />

      <label>Código de Cliente:</label>
      <input type="text" [(ngModel)]="prestamo.clienteCodigo" />

      <label>Situación:</label>
      <input type="text" [(ngModel)]="prestamo.situacion" />

      <label>Código de Usuario:</label>
      <input type="text" [(ngModel)]="prestamo.usuarioCodigo" />

      <label>Total:</label>
      <input type="text" [(ngModel)]="prestamo.total" />
      <label>Observación:</label>
      <textarea [(ngModel)]="prestamo.observacion"></textarea>
      <button (click)="actualizarPrestamo()">Actualizar</button>
    </div>`,
})
export class EditarPrestamoComponent implements OnInit {
  prestamo: any = {};
  prestamos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarPrestamos();
  }

  listarPrestamos() {
    const url = 'http://localhost:8080/PROYECTO-REST/rest/prestamo/list';
    this.http.get<any[]>(url).subscribe(
      (response: any[]) => {
        this.prestamos = response;
      },
      (error) => {
        console.error('Error al listar los préstamos:', error);
      }
    );
  }

  buscarPrestamo(codigo: number) {
    const url = `http://localhost:8080/PROYECTO-REST/rest/prestamo/find/${codigo}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.prestamo = response;
        console.log('Prestamo encontrado:', this.prestamo);
      },
      (error) => {
        console.error('Error al buscar el préstamo:', error);
      }
    );
  }

  eliminarPrestamo(numero: number) {
    const url = `http://localhost:8080/PROYECTO-REST/rest/prestamo/delete/${numero}`;
    this.http.delete(url).subscribe(
      () => {
        this.listarPrestamos();
      },
      (error) => {
        console.error('Error al eliminar el préstamo:', error);
      }
    );
  }

  actualizarPrestamo() {
    const url = 'http://localhost:8080/PROYECTO-REST/rest/prestamo/update';
    const requestData = this.createRequestData();
    this.http.put(url, requestData).subscribe(
      (response) => {
        console.log('Prestamo actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el préstamo:', error);
      }
    );
  }

  private createRequestData() {
    const requestData: any = {
      numero: this.prestamo.numero,
      fecha: this.prestamo.fecha,
      cliente: {
        codigo: this.prestamo.clienteCodigo,
      },
      situacion: this.prestamo.situacion,
      usuario: {
        codigo: this.prestamo.usuarioCodigo,
      },
      total: this.prestamo.total,
      observacion: this.prestamo.observacion,
      lista: [],
    };
    return requestData;
  }
}
