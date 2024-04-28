import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  profile!: Profile;
  user: User | null = null;

  userNameForm: FormGroup;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userNameForm = this.formBuilder.group({
      username: [''],
    });
  }

  ngOnInit() {
    this.loadProfile();
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
      if (this.userNameForm) {
        this.userNameForm.patchValue({ username: this.user.username });
      }
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  logout() {
    this.authService.logout(this.user).subscribe(
      response => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }
    )
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
      },
      error: (error) => {
        console.error(error);
      },
    } as Observer<Profile>);
  }
}
