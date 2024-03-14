import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService) { }

  registerUser(username: string, type: string): void {
    const user = { username, type };
    this.authService.register(user).subscribe(
      response => {
        console.log('registro exitoso', response);
      },
      error => {
        console.error('Error en el registro:', error)
      }
    )
  }

  ngOnInit() {
  }

}
