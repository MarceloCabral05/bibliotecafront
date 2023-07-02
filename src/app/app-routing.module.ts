import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarCiudadComponent } from './components/consultar-ciudad.component';
import { EditarCiudadComponent } from './components/editar-ciudad.component';
import { ConsultarLibroComponent } from './components/consultar-libro.component';
import { EditarLibroComponent } from './components/editar-libro.component';
import { ConsultarClienteComponent } from './components/consultar-cliente.component';
import { EditarClienteComponent } from './components/editar-cliente.component';
import { ConsultarAutorComponent } from './components/consultar-autor.component';
import { EditarAutorComponent } from './components/editar-autor.component';
import { ConsultarUsuarioComponent } from './components/consultar-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario.component';
import { PaginaInicioComponent } from './components/pagina-inicio.component';
import { LoginComponent } from './components/login.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardRedirect } from './auth-redirect.guard';
import { ConsultarPrestamoComponent } from './components/consultar-prestamo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardRedirect],
  },
  {
    path: 'olvide-contrasena',
    component: OlvideContrasenaComponent,
    canActivate: [AuthGuardRedirect],
  },
  {
    path: 'inicio',
    component: PaginaInicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarciudad',
    component: ConsultarCiudadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarciudad/:id',
    component: EditarCiudadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarlibro',
    component: ConsultarLibroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarlibro/:id',
    component: EditarLibroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarcliente',
    component: ConsultarClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarcliente/:id',
    component: EditarClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarautor',
    component: ConsultarAutorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarautor/:id',
    component: EditarAutorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarusuario',
    component: ConsultarUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarusuario/:id',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarprestamo',
    component: ConsultarPrestamoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
