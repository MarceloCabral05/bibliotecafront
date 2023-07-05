import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['../Usuario/editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  hide = true;
  id: any;
  username: any;
  password: any;
  answer: string | undefined;
  selectedQuestion = '¿Cuál fue el nombre de tu primera mascota?';

  securityQuestions = [
    '¿Cuál fue el nombre de tu primera mascota?',
    '¿En qué ciudad naciste?',
    '¿Cuál es el nombre de soltera de tu madre?',
    '¿Cuál es tu película favorita?',
    '¿Cuál es tu color favorito?',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    if (this.id > 0) {
      axios
        .get<any>(
          'http://localhost:8080/PROYECTO-REST/rest/usuario/find/' + this.id
        )
        .then((resultado) => {
          this.username = resultado['data']['result']['username'];
          this.password = resultado['data']['result']['password'];
        });
    }
  }

  isQuestionSelected(): boolean {
    return !!this.selectedQuestion;
  }

  guardarUsuario = () => {
    if (
      !this.username ||
      !this.password ||
      !this.selectedQuestion ||
      !this.answer
    ) {
      this._snackBar.open('Debe llenar todos los campos', '', {
        duration: 3000,
      });
      return;
    }

    const usuarioUpdate = {
      codigo: this.id,
      username: this.username,
      password: this.password,
      pregunta: this.selectedQuestion.toLowerCase(),
      respuesta: this.answer.toLowerCase(),
    };

    axios
      .put(
        'http://localhost:8080/PROYECTO-REST/rest/usuario/update',
        usuarioUpdate
      )
      .then((resultado: any) => {
        this._snackBar.open(
          `Registro Guardado #${resultado.data['result']['codigo']}`,
          '',
          {
            duration: 3000,
          }
        );

        this.router.navigate(['/consultarusuario']);
      });
  };
}
