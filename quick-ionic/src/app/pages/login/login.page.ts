import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) {
    this.email = "";
    this.password = "";
  }

  ngOnInit() {
  }

  login() {
    const user = {email: this.email, password: this.password};
    this.authService.login(user).subscribe(
      (data) =>{
        this.authService.setToken(data.token);
        this.router.navigateByUrl("/");
    },
    error => {
      console.log(error);
    });
  }

}
