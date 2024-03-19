import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  pageloaded: boolean;

  registerForm: FormGroup;
  passwordError: boolean;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.pageloaded = false;
    this.passwordError = false;

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.register(user).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/login']);
      });
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }
}