import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordError: boolean;

  constructor(private authService: AuthService, public router: Router) {
    this.username = ""; 
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.passwordError = false;
  }

  register(){
    const user = {username: this.username, email: this.email, password: this.password}
    this.authService.register(user).subscribe((data) =>{
      this.authService.setToken(data.token);
    })
  }

  ngOnInit() {
  }

}
