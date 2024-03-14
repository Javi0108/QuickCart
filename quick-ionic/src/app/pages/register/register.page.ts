import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService) { }

  registerUser(username: string, password: string, email: string, name: string, type: string) {
    this.authService.register(username, password, email, name, type)
      .subscribe(
        response => {
          // Manejar la respuesta del servidor, por ejemplo, redirigir a la página de inicio de sesión
        },
        error => {
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
  }

  ngOnInit() {
  }

}
