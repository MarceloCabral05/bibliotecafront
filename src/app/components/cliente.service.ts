import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/PROYECTO-REST/rest/cliente';

  constructor() {}

  obtenerClientes(): Observable<any[]> {
    return from(axios.get<any>(`${this.apiUrl}/list`)).pipe(
      map((response) => response.data['result'])
    );
  }

  obtenerClientePorCodigo(codigo: number): Observable<any> {
    return from(axios.get<any>(`${this.apiUrl}/find/${codigo}`)).pipe(
      map((response) => response.data['result'])
    );
  }

  actualizarCliente(cliente: any): Observable<any> {
    return from(axios.put<any>(`${this.apiUrl}/update`, cliente)).pipe(
      map((response) => response.data['result'])
    );
  }

  eliminarCliente(codigo: number): Observable<void> {
    return from(axios.delete<void>(`${this.apiUrl}/delete/${codigo}`)).pipe(
      map((response) => response.data)
    );
  }
}
