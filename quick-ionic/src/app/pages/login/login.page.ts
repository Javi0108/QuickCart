import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NotificationToastService } from 'src/app/services/notification-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pageloaded: boolean;
  loginForm: FormGroup;
  passwordSeen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private notificationToastService: NotificationToastService
  ) {
    this.pageloaded = false;
    this.passwordSeen = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.authService.login(user).subscribe((data) => {
        this.router.navigateByUrl("/");
      },
        error => {
          this.notificationToastService.presentToast(
            'Incorrect username or password. Please try again.',
            'danger',
            '../../assets/exclamation.svg'
          );
        });
    }
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
