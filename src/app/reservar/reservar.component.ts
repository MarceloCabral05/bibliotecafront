import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../components/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrestamoService } from '../components/prestamo.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
})
export class ReservarComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private prestamoService: PrestamoService
  ) {}
  clientes: any[] = [];

  libros: any[] = [];

  clienteSeleccionado: number = 0;
  carrito: any[] = [];

  dataSource!: MatTableDataSource<any>;

  columnas: string[] = ['descripcion', 'cantidad', 'acciones'];

  ngOnInit() {
    this.clienteService.obtenerClientes().subscribe((x) => {
      console.log(x);
      this.clientes = x;
    });
    this.prestamoService.obtenerLibros().subscribe((x) => {
      console.log(x);
      this.libros = x;
    });
    this.dataSource = new MatTableDataSource(this.carrito);
  }

  libroEnCarrito(libro: any): boolean {
    return this.carrito.some((l) => l.codigo === libro.codigo);
  }

  agregarLibro(libro: any) {
    console.log(libro);
    const index = this.carrito.findIndex((l) => l.codigo === libro.codigo);
    if (index === -1) {
      if (libro.cantidad > 0) {
        const nuevoLibro = {
          codigo: libro.codigo,
          descripcion: libro.descripcion,
          cantidad: 1,
        };
        this.carrito.push(nuevoLibro);
        libro.cantidad--;
      }
    } else {
      const carritoLibro = this.carrito[index];
      if (carritoLibro.cantidad < libro.cantidad) {
        carritoLibro.cantidad++;
        libro.cantidad--;
      }
    }

    this.dataSource = new MatTableDataSource(this.carrito);
  }
  incrementarCantidad(libro: any) {
    console.log(libro);
    const indexDisponible = this.libros.findIndex(
      (l) => l.codigo === libro.codigo
    );
    const index = this.carrito.findIndex((l) => l.codigo === libro.codigo);
    if (index !== -1) {
      const carritoLibro = this.carrito[index];
      if (0 < this.libros[indexDisponible].cantidad) {
        carritoLibro.cantidad++;
        this.libros[indexDisponible].cantidad--;
      }
    }

    this.dataSource = new MatTableDataSource(this.carrito);
  }

  eliminarLibro(libro: any) {
    console.log(libro);
    const index = this.carrito.findIndex((l) => l.codigo === libro.codigo);
    const indexDisponible = this.libros.findIndex(
      (l) => l.codigo === libro.codigo
    );
    if (index !== -1) {
      const carritoLibro = this.carrito[index];
      if (carritoLibro.cantidad > 1) {
        carritoLibro.cantidad--;
        this.libros[indexDisponible].cantidad++;
      } else {
        this.carrito.splice(index, 1);
        this.libros[indexDisponible].cantidad++;
      }
    }

    this.dataSource = new MatTableDataSource(this.carrito);
  }

  finalizarReserva() {
    const cliente = {
      codigo: this.clienteSeleccionado,
    };

    const lista = this.carrito.map((item) => {
      return {
        dias: item.dias || 14,
        fechaDevolucion: item.fechaDevolucion || '2023-07-16T00:00:00',
        estado: item.estado || 1,
        libro: {
          codigo: item.codigo,
        },
        valor: parseFloat('20').toFixed(2), // Converter para double com 2 casas decimais
      };
    });

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString().split('T')[0];

    const total = parseFloat('20').toFixed(2); // Calcular o total e converter para double com 2 casas decimais

    console.log({
      numero: 2,
      fecha: dataFormatada,
      total: total,
      cliente: cliente,
      situacion: '0',
      usuario: {
        codigo: 2,
      },
      observacion: 'No devuelto',
      lista: lista,
    });

    this.prestamoService
      .actualizarPrestamoRegistrar({
        numero: 2,
        fecha: dataAtual,
        total: total,
        cliente: cliente,
        situacion: '0',
        usuario: {
          codigo: 2,
        },
        observacion: 'No devuelto',
        lista: lista,
      })
      .then((x) => {
        console.log(x);
        this.router.navigate(['/consultarprestamo']);
      });
  }
}
//como puedo enviar al git ... yo suelo arrastrar nomas hasta alla podes hacer aca en mi pc no entra al git pide algo que llegara al correodale man 