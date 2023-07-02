import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';

export class PrestamoService {
  private baseUrl = 'http://localhost:8080/PROYECTO-REST/rest/prestamo';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  listarPrestamos(): Promise<Prestamo[]> {
    const url = `${this.baseUrl}/list`;
    return this.axiosInstance.get<Prestamo[]>(url).then(response => response.data);
  }

  buscarPrestamo(codigo: number): Promise<Prestamo> {
    const url = `${this.baseUrl}/find/${codigo}`;
    return this.axiosInstance.get<Prestamo>(url).then(response => response.data);
  }

  actualizarPrestamo(prestamo: Prestamo): Promise<Prestamo> {
    const url = `${this.baseUrl}/update`;
    return this.axiosInstance.put<Prestamo>(url, prestamo).then(response => response.data);
  }

  borrarPrestamo(numero: number): Promise<void> {
    const url = `${this.baseUrl}/delete/${numero}`;
    return this.axiosInstance.delete<void>(url).then(response => response.data);
  }
}

export interface Prestamo {
  numero: number;
  fecha?: string;
  clienteCodigo: number;
  situacion: number;
  usuarioCodigo: number;
  total: number;
  observacion: string;
}
