import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

//Design ui first for all functionalities
//Figure out a way to style the components
//Create borrow list and edit components
//Implement search functionality
//Implement list of borrows, update, delete and nullify
//Search using dropdown, combobox o select
//Restrict borrow if there is no stock
//Borrow form with title, details, cancel button, search, add and remove books
//Put items in boxes with icons in home page
//Add email to the user table
//Search for the sql file

@Component({
  selector: 'app-pagina-inicio',
  template: `
    <div class="container">
      <h1>App de Biblioteca</h1>
      <nav>
      <button mat-button routerLink="/prestar">Nuevo Préstamo</button>
        <button mat-button routerLink="/consultarprestamo">Consultar Préstamos</button>
        <button mat-button routerLink="/consultarlibro">Libros</button>
        <button mat-button routerLink="/consultarautor">Autores</button>
        <button mat-button routerLink="/consultarusuario">Usuarios</button>
        <button mat-button routerLink="/consultarcliente">Clientes</button>
        <button mat-button (click)="logout()">Salir</button>
      </nav>
    </div>
  `,
})
export class PaginaInicioComponent {
  constructor(private location: Location, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.location.back();
  }
}
