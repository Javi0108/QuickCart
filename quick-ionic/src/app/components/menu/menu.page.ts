import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user: User | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
      console.log(this.user)
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  logout() { 
    this.authService.logout(this.user).subscribe(
      response => {
        console.log('Logout succesful');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }
    )
  }

}
