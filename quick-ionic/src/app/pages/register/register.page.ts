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
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      username: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      password: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      confirmPassword: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      user_type: ['', [Validators.required, this.userTypeValidator]]
    });
  }

  userTypeValidator(control: any) {
    if (control.value !== 'Client' && control.value !== 'Seller') {
      return { 'invalidUserType': true };
    }
    return null;
  }

  onUserTypeChange() {
    const userType = this.registerForm.get('user_type')?.value;
    if (userType === 'Client' || userType === 'Seller') {
      // Si se selecciona un tipo de usuario válido, habilitar los campos correspondientes
      this.registerForm.get('email')?.enable();
      this.registerForm.get('username')?.enable();
      this.registerForm.get('password')?.enable();
      this.registerForm.get('confirmPassword')?.enable();
    } else {
      // Si no se selecciona un tipo de usuario válido, deshabilitar los campos
      this.registerForm.get('email')?.disable();
      this.registerForm.get('username')?.disable();
      this.registerForm.get('password')?.disable();
      this.registerForm.get('confirmPassword')?.disable();
    }
  }

  register() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      console.log(user);
      this.authService.register(user).subscribe((data) => {
        console.log(data);
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
