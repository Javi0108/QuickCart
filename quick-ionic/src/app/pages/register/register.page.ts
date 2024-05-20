import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationToastService } from 'src/app/services/notification-toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  pageloaded: boolean;
  registerForm: FormGroup;
  passwordError: boolean;
  passwordSeen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationToastService: NotificationToastService,
    private router: Router
  ) {
    this.pageloaded = false;
    this.passwordError = false;
    this.passwordSeen = false;

    this.registerForm = this.formBuilder.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      username: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      password: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      confirmPassword: [{ value: '', disabled: true }, Validators.required], // Deshabilitado por defecto
      user_type: ['', [Validators.required, this.userTypeValidator]],
    });
  }

  userTypeValidator(control: any) {
    if (control.value !== 'Client' && control.value !== 'Seller') {
      return { invalidUserType: true };
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

      if (this.validatePassword()) {
        console.log('Password validated');
      }
      
      this.authService.register(user).subscribe((data) => {
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationToastService.presentToast(
            'Signup failed',
            'danger',
            '../../assets/exclamation.svg'
          );
      });
    }
  }

  validatePassword(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      this.notificationToastService.presentToast(
        'Confirmation password is not equal',
        'danger',
        '../../assets/exclamation.svg'
      );
      return false;
    }

    // Valida longitud de la contraseña
    if (password.length >= 6) {
      return false;
    }

    // Valida letras mayúsculas
    const uppercasePattern = /[A-Z]/;
    if (!uppercasePattern.test(password)) {
      return false;
    }

    // Valida números
    const numberPattern = /[0-9]/;
    if (!numberPattern.test(password)) {
      return false;
    }

    //Valida caracteres especiales
    const especialPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!especialPattern.test(password)) {
      return false;
    }

    // Valida espacios en blanco
    const blankSpacePattern = /(\s)/;
    if (blankSpacePattern.test(password)) {
      return false;
    }

    return true;
  }

  showHide(event: any, inputId: string) {
    const parentElement = document.getElementById(event.target.id);
    const input = document.getElementById(inputId) as HTMLInputElement;
    
    if (input != undefined) {
      if (parentElement != undefined) {
        if (this.passwordSeen == false) {
          input.type = 'text';
          parentElement.innerHTML =
            '<ion-icon slot="icon-only" name="eye-off" aria-hidden="true"></ion-icon>';
          this.passwordSeen = true;
        } else {
          input.type = 'password';
          parentElement.innerHTML =
            '<ion-icon slot="icon-only" name="eye" aria-hidden="true"></ion-icon>';
          this.passwordSeen = false;
        }
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pageloaded = true;
  }
}