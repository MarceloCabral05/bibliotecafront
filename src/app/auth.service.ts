import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/PROYECTO-REST/rest/usuario';

  constructor() {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  obtenerDatos(usuario:any): Observable<any[]> {
    return from(axios.post<any>(`${this.apiUrl}/restablecer`),usuario).pipe(
      tap((response) => console.log(response)), // Imprimir el response
      map((response) => response.data['result'])
    );
  }

  obtenerDatos2(usuario: any): Observable<any> {
    return new Observable((observer) => {
      axios
        .post(`${this.apiUrl}/restablecer`, usuario)
        .then((response) => {
          console.log(response.data); // Imprimir el response
          observer.next(response.data['result']);
          observer.complete();
        })
        .catch((error) => {
          console.error(error);
          observer.error(error);
        });
    });
  }

}
