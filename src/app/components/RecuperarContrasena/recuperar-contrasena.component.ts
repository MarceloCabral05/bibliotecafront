import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
interface Libro {
  codigo: number;
  descripcion: string;
  cantidad: number;
  obs: string;
  cantidadSeleccionada?: number;
  precio?: number;
  precioTotal?: number;
}
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
})
export class RecuperarContrasenaComponent {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  selectedQuestion: string | null = null;
  answer: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isAnswered: boolean = false;
  email: string = '';
  securityQuestions: string[] = [
    '¿Cuál fue el nombre de tu primera mascota?',
    '¿En qué ciudad naciste?',
    '¿Cuál es el nombre de soltera de tu madre?',
    '¿Cuál es tu película favorita?',
    '¿Cuál es tu color favorito?',
  ];

  isQuestionSelected(): boolean {
    return !!this.selectedQuestion;
  }

  checkAnswer(): void {
    // Validar la respuesta ingresada por el usuario y el campo de correo electrónico
    if (!this.answer || !this.email) {
      return;
    }

    // Si la respuesta y el correo electrónico son válidos, permitir al usuario ingresar la nueva contraseña
    this.isAnswered = true;
  }

  unCheckAnswer(): void {
    // Regresar al paso anterior, donde se selecciona y responde la pregunta de seguridad
    this.isAnswered = false;
  }

  resetPassword(): void {
    // Validar que las contraseñas coincidan
    if (
      this.newPassword === this.confirmPassword &&
      this.newPassword.toString().length > 0
    ) {
      // Crear el objeto usuario con los datos necesarios para enviar al servicio
      const usuario = {
        username: this.email,
        pregunta: this.selectedQuestion,
        respuesta: this.answer,
        password: this.newPassword,
      };

      // Llamar al servicio para obtener los datos
      this.authService.obtenerDatos2(usuario).subscribe(
        (datos) => {
          this._snackBar.open(
            'Se restableció tu contraseña. Puedes iniciar sesión ahora.',
            '',
            {
              duration: 3000,
            }
          );
          console.log(datos);
          this.router.navigate(['/login']);
        },
        (error) => {
          // Manejar el error
          this._snackBar.open(
            'Ocurrió un error al restablecer la contraseña. Por favor, intenta nuevamente.',
            '',
            {
              duration: 3000,
            }
          );
        }
      );
    }
  }
}
