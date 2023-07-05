import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultarCiudadComponent } from './components/consultar-ciudad.component';
import { EditarCiudadComponent } from './components/editar-ciudad.component';
import { NgModule } from '@angular/core';
import { ConsultarLibroComponent } from './components/consultar-libro.component';
import { EditarLibroComponent } from './components/editar-libro.component';
import { ConsultarClienteComponent } from './components/consultar-cliente.component';
import { EditarClienteComponent } from './components/editar-cliente.component';
import { ConsultarAutorComponent } from './components/consultar-autor.component';
import { EditarAutorComponent } from './components/editar-autor.component';
import { ConsultarUsuarioComponent } from './components/consultar-usuario.component';

import { PaginaInicioComponent } from './components/pagina-inicio.component';
import { EditarPrestamoComponent } from './components/editar-prestamo.component';
import { LoginComponent } from './components/login.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena.component';
import { PrestamoService } from './components/prestamo.service';
import { ConsultarPrestamoComponent } from './components/consultar-prestamo.component';
import { RecuperarContrasenaComponent } from './components/RecuperarContrasena/recuperar-contrasena.component';
import { EditarUsuarioComponent } from './components/Usuario/editar-usuario.component';
import { ReservarComponent } from './reservar/reservar.component';


@NgModule({
  declarations: [
    AppComponent,
    ConsultarCiudadComponent,
    EditarCiudadComponent,
    ConsultarLibroComponent,
    EditarLibroComponent,
    ConsultarClienteComponent,
    EditarClienteComponent,
    ConsultarAutorComponent,
    EditarAutorComponent,
    ConsultarUsuarioComponent,
    EditarUsuarioComponent,
    PaginaInicioComponent,
    EditarPrestamoComponent,
    LoginComponent,
    OlvideContrasenaComponent,
    ConsultarPrestamoComponent,
    RecuperarContrasenaComponent,
    ReservarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, // Agrega FormsModule
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  providers: [PrestamoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
