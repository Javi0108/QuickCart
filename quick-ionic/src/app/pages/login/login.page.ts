import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pageloaded: boolean;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
    this.pageloaded = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      this.authService.login(user).subscribe((data) => {
        this.authService.setToken(data.token);
        this.router.navigateByUrl("/");
      },
        error => {
          console.log(error)
        }
      )
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }
}
