import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationToastService } from 'src/app/services/notification-toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePassword implements OnInit {
  user!: User;
  pageloaded: boolean;
  passwordForm: FormGroup;
  passwordSeen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private notificationToastService: NotificationToastService
  ) {
    this.pageloaded = false;
    this.passwordSeen = false;

    this.passwordForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changePassword() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
    }

    if (this.validatePassword()) {
      console.log('Password validated');
    } else {
      this.notificationToastService.presentToast(
        'Error updating password',
        'danger',
        '../../assets/exclamation.svg'
      );
    }
    this.authService.changeUserPassword(this.passwordForm, this.user).subscribe({
      next: (user: User) => {
        this.notificationToastService.presentToast(
          'Password updated successfully',
          'success',
          '../../assets/check.svg'
        );
        this.authService.logout(this.user);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        this.notificationToastService.presentToast(
          'Failed to update password',
          'danger',
          '../../assets/exclamation.svg'
        );
      },
    });
  }

  validatePassword(): boolean {
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    const step1 = document.getElementById('step1') as HTMLElement;
    const step2 = document.getElementById('step2') as HTMLElement;
    const step3 = document.getElementById('step3') as HTMLElement;
    const step4 = document.getElementById('step4') as HTMLElement;
    const step5 = document.getElementById('step5') as HTMLElement;

    if (newPassword != confirmPassword) {
      this.notificationToastService.presentToast(
        'Confirmation password is not equal',
        'danger',
        '../../assets/exclamation.svg'
      );
      return false;
    }

    // Valida longitud de la contraseña
    if (newPassword.length >= 6) {
      step1.style.color = '#2DD55B';
    } else {
      step1.style.color = '#DD465B';
      return false;
    }

    // Valida letras mayúsculas
    const uppercasePattern = /[A-Z]/;
    if (uppercasePattern.test(newPassword)) {
      step2.style.color = '#2DD55B';
    } else {
      step2.style.color = '#DD465B';
      return false;
    }

    // Valida números
    const numberPattern = /[0-9]/;
    if (numberPattern.test(newPassword)) {
      step3.style.color = '#2DD55B';
    } else {
      step3.style.color = '#DD465B';
      return false;
    }

    //Valida caracteres especiales
    const especialPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (especialPattern.test(newPassword)) {
      step4.style.color = '#2DD55B';
    } else {
      step4.style.color = '#DD465B';
      return false;
    }

    // Valida espacios en blanco
    const blankSpacePattern = /(\s)/;
    if (!blankSpacePattern.test(newPassword)) {
      step5.style.color = '#2DD55B';
    } else {
      step5.style.color = '#DD465B';
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

  ngAfterViewInit() {
    this.pageloaded = true;
  }
}
