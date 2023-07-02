// import { Component, OnInit } from '@angular/core';
// import { PrestamoService, Prestamo } from './prestamo.service';

// @Component({
//   selector: 'app-consultar-prestamo',
//   template: `<h2>Listado de Préstamos</h2>
//     <ul>
//       <li *ngFor="let prestamo of prestamos">
//         {{ prestamo.numero }} - {{ prestamo.fecha }}
//         <button (click)="buscarPrestamo(prestamo.numero)">Editar</button>
//         <button (click)="eliminarPrestamo(prestamo.numero)">Eliminar</button>
//       </li>
//     </ul>
//     <hr />

//     <h2>Editar Préstamo</h2>
//     <div>
//       <label>Número:</label>
//       <input type="text" [(ngModel)]="prestamo.numero" />

//       <label>Fecha:</label>
//       <input type="date" [(ngModel)]="prestamo.fecha" />

//       <label>Código de Cliente:</label>
//       <input type="text" [(ngModel)]="prestamo.clienteCodigo" />

//       <label>Situación:</label>
//       <input type="text" [(ngModel)]="prestamo.situacion" />

//       <label>Código de Usuario:</label>
//       <input type="text" [(ngModel)]="prestamo.usuarioCodigo" />

//       <label>Total:</label>
//       <input type="text" [(ngModel)]="prestamo.total" />
//       <label>Observación:</label>
//       <textarea [(ngModel)]="prestamo.observacion"></textarea>
//       <button (click)="actualizarPrestamo()">Actualizar</button>
//     </div>`,
// })
// export class ConsultarPrestamoComponent implements OnInit {
//   prestamos: Prestamo[] = [];
//   prestamo: Prestamo = {
//     numero: 0,
//     fecha: '',
//     clienteCodigo: 0,
//     situacion: 0,
//     usuarioCodigo: 0,
//     total: 0,
//     observacion: '',
//   };

//   constructor(private prestamoService: PrestamoService) {}

//   ngOnInit() {
//     this.listarPrestamos();
//   }

//   listarPrestamos() {
//     this.prestamoService.listarPrestamos().then(prestamos => {
//       this.prestamos = prestamos;
//     });
//   }

//   buscarPrestamo(codigo: number) {
//     this.prestamoService.buscarPrestamo(codigo).then(prestamo => {
//       this.prestamo = prestamo;
//     });
//   }

//   actualizarPrestamo() {
//     this.prestamoService.actualizarPrestamo(this.prestamo).then(updatedPrestamo => {
//       console.log('Préstamo actualizado:', updatedPrestamo);
//     });
//   }

//   eliminarPrestamo(numero: number) {
//     this.prestamoService.borrarPrestamo(numero).then(() => {
//       console.log('Préstamo eliminado');
//       this.listarPrestamos();
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { PrestamoService, Prestamo } from './prestamo.service';

@Component({
  selector: 'app-consultar-prestamo',
  template: `
    <h2>Listado de Préstamos</h2>
    <ul>
      <li *ngFor="let prestamo of prestamos">
        {{ prestamo.numero }} - {{ prestamo.fecha }}
        <button (click)="buscarPrestamo(prestamo.numero)">Editar</button>
        <button (click)="eliminarPrestamo(prestamo.numero)">Eliminar</button>
      </li>
      <li *ngIf="prestamos.length === 0">No hay préstamos registrados.</li>
    </ul>
    <hr />

    <h2>Editar Préstamo</h2>
    <div *ngIf="prestamo.numero">
      <label>Número:</label>
      <input type="text" [(ngModel)]="prestamo.numero" disabled />

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
    </div>
    <div *ngIf="!prestamo.numero">
      No se ha seleccionado ningún préstamo para editar.
    </div>
  `,
  styles: [
    `
      /* Estilos CSS */
      ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
      }

      li {
        margin-bottom: 5px;
      }

      hr {
        margin: 20px 0;
        border: none;
        border-top: 1px solid #ccc;
      }
    `,
  ],
})
export class ConsultarPrestamoComponent implements OnInit {
  prestamos: Prestamo[] = [];
  prestamo: Prestamo = {
    numero: 0,
    fecha: '',
    clienteCodigo: 0,
    situacion: 0,
    usuarioCodigo: 0,
    total: 0,
    observacion: '',
  };

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit() {
    this.listarPrestamos();
  }

  listarPrestamos() {
    this.prestamoService.listarPrestamos().then((prestamos) => {
      this.prestamos = prestamos;
    });
  }

  buscarPrestamo(codigo: number) {
    this.prestamoService.buscarPrestamo(codigo).then((prestamo) => {
      this.prestamo = prestamo;
    });
  }

  actualizarPrestamo() {
    this.prestamoService
      .actualizarPrestamo(this.prestamo)
      .then((updatedPrestamo) => {
        console.log('Préstamo actualizado:', updatedPrestamo);
        // Agregar una notificación o mensaje de éxito aquí
      });
  }

  eliminarPrestamo(numero: number) {
    this.prestamoService.borrarPrestamo(numero).then(() => {
      console.log('Préstamo eliminado');
      // Agregar una notificación o mensaje de éxito aquí
      this.listarPrestamos();
    });
  }
}
